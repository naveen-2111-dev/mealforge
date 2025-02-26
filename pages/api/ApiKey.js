import ConnectDb from "@/lib/connect";
import { isAuthenticated } from "./middleware";
import bcrypt from "bcrypt";
import Joi from "joi";
import machineUuid from "machine-uuid";

const validation = Joi.object({}).empty().unknown(false);
let premium = false;
const limit = premium ? Infinity : 6;

export default async function GET(req, res) {
  try {
    await isAuthenticated(req, res, async () => {
      try {
        const { error } = validation.validate(req.query);
        if (error) {
          return res.status(400).json({
            error: error.details[0].message,
          });
        }

        const db = await ConnectDb();
        const data = req.user;

        if (!data || !data.Email) {
          return res.status(401).json({ error: "Login first...!" });
        }

        const user = await db.APIschema.findOne({ email: data.Email });
        let randomCount = user?.limit || 0;

        if (randomCount >= limit) {
          return res.status(403).json({ error: "Free plan limit reached" });
        }

        randomCount++;

        const random = "cook_" + (await bcrypt.hash(data.Email, 10));

        await db.APIschema.updateOne(
          { email: data.Email },
          { $set: { limit: randomCount } },
          { upsert: true }
        );

        let ip = null;
        try {
          ip = await machineUuid();
        } catch (err) {
          console.error("Error fetching UUID:", err);
          ip = null;
        }

        const inserted = await db.APIschema.insertOne({
          email: data.Email,
          Ip: ip,
          Key: random,
          KeyName: `testkey_${randomCount}`, 
          limit: randomCount,
        });

        if (!inserted.insertedId) {
          return res.status(500).json({ error: "Failed to create API key" });
        }

        return res.status(200).json({ message: "Success", Key: random });
      } catch (innerError) {
        console.error("Inner Error:", innerError);
        return res.status(500).json({ error: "An internal error occurred" });
      }
    });
  } catch (error) {
    console.error("Outer Error:", error);
    return res.status(500).json({ error: "Authentication failed" });
  }
}
