import ConnectDb from "@/lib/connect";
import { isApivalid } from "../middleware";
import Joi from "joi";
import { ObjectId } from "mongodb";

const recipeSchema = Joi.object({
  recipeid: Joi.string()
    .length(24)
    .regex(/^[a-fA-F0-9]{24}$/)
    .required(),
}).unknown(false);

export default async function GET(req, res) {
  try {
    await isApivalid(req, res, async () => {
      const { error } = recipeSchema.validate(req.query);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }
      const { recipeid } = req.query;
      if (req.body) {
        return res.status(401).json({
          error: "bad request",
        });
      }
      if (!recipeid) {
        return res.status(400).json({
          error: "invalid request, missing fields",
        });
      }

      const db = await ConnectDb();
      const result = await db.Recipe.findOne({ _id: new ObjectId(recipeid) });
      if (!result) {
        return res.status(400).json({
          error: "recipe not found",
        });
      }

      return res.status(200).json({
        error: "success",
        data: result,
      });
    });
  } catch (error) {
    console.log("out", error);
    return res.status(500).json({
      error: "API verification failed",
    });
  }
}
