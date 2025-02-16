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
          return res.status(401).json({
            error: "Login first...!",
          });
        }

        const users = await db.APIschema.findOne({ email: data.Email });
        let randomCount = users?.limit || 0;

        const random = "cook_" + (await bcrypt.hash(data.Email, 10));
        randomCount++;

        if (randomCount > 1) {
          await db.APIschema.updateMany(
            { email: data.Email },
            { $set: { limit: randomCount } },
            { upsert: true }
          );
        }

        if (randomCount === limit) {
          return res.status(401).json({
            error: "free plan",
          });
        }

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
          KeyName: `testkey_${randomCount + 1}`,
          limit: randomCount,
        });

        if (!inserted.insertedId) {
          return res.status(401).json({
            error: "failed",
          });
        }

        return res.status(200).json({
          message: "Success",
        });
      } catch (innerError) {
        console.error("Inner Error:", innerError);
        return res.status(500).json({
          error: "An internal error occurred",
        });
      }
    });
  } catch (error) {
    console.error("Outer Error:", error);
    return res.status(500).json({
      error: "Authentication failed",
    });
  }
}
