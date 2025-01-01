import ConnectDb from "@/lib/connect";
import { isApivalid } from "../middleware";
import Joi from "joi";

const valid = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
}).unknown(false);

export default async function GET(req, res) {
  try {
    await isApivalid(req, res, async () => {
      try {
        const db = await ConnectDb();

        const { page = 1, limit = 10 } = req.query;
        const { error } = valid.validate(req.query);
        if (error) {
          return res.status(400).json({
            error: error.details[0].message,
          });
        }

        if (req.body) {
          return res.status(401).json({
            error: "bad request",
          });
        }

        const skip = (page - 1) * limit;
        const limitValue = parseInt(limit, 10);

        const result = await db.Recipe.find({})
          .skip(skip)
          .limit(limitValue)
          .toArray();

        const totalRecords = await db.Recipe.countDocuments({});

        if (result.length === 0) {
          return res.status(404).json({
            error: "No recipes found",
          });
        }

        return res.status(200).json({
          message: "Success",
          pagination: {
            page: parseInt(page, 10),
            limit: limitValue,
            totalRecords: totalRecords,
            totalPages: Math.ceil(totalRecords / limitValue),
          },
          data: result,
        });
      } catch (innerError) {
        console.error("Inner Error:", innerError);
        return res.status(500).json({
          error: "Internal server error",
        });
      }
    });
  } catch (outerError) {
    console.error("Outer Error:", outerError);
    return res.status(500).json({
      error: "API verification failed",
    });
  }
}
