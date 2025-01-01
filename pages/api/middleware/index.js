import jwt from "jsonwebtoken";
import ConnectDb from "@/lib/connect";
import axios from "axios";

export async function isAuthenticated(req, res, next) {
  try {
    const auth = req.headers["x-access-token"];
    const token = auth && auth.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "verification failed",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Authentication Error: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function isApivalid(req, res, next) {
  try {
    let ip = null;

    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      ip = response.data.ip;
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch public IP" });
       ip = null;
    }
    const auth = req.headers["x-api"];
    const mail = req.headers["x-email"];
    if (!auth || !mail) {
      return res.status(400).json({
        message: "API key or email is missing",
      });
    }
    const db = await ConnectDb();
    const keyFind = await db.APIschema.findOne({ email: mail });
    if (!keyFind || keyFind.Key !== auth || keyFind.Ip !== ip) {
      return res.status(401).json({
        message: "Invalid API key or email",
      });
    }

    req.apiKey = keyFind;
    next();
  } catch (error) {
    console.error("Authentication Error: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
