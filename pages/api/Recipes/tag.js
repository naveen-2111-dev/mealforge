import ConnectDb from "@/lib/connect";
import { isApivalid } from "../middleware";
import Fuse from "fuse.js";
import Joi from "joi";

const valid = Joi.object({
  tag: Joi.alternatives()
    .try(Joi.string(), Joi.array().items(Joi.string()))
    .required(),
  threshold: Joi.number().min(0).max(1).default(0.6),
}).unknown(false);

export default async function GET(req, res) {
  try {
    await isApivalid(req, res, async () => {
      try {
        const { error } = valid.validate(req.query);
        if (error) {
          return res.status(400).json({
            error: error.details[0].message,
          });
        }

        if (Object.keys(req.body).length > 0) {
          return res.status(400).json({
            error: "invalid input formate",
          });
        }

        const { tag, threshold } = req.query;

        const validThreshold =
          threshold !== undefined
            ? Math.min(Math.max(Number(threshold), 0), 1)
            : 0.6;

        const db = await ConnectDb();
        const result = await db.Recipe.find({}).toArray();


        const options = {
          keys: ["tags"],
          threshold: validThreshold,
          limit: 10,
        };

        const fuse = new Fuse(result, options);
        let searchResults = [];

        if (Array.isArray(tag)) {
          searchResults = tag.flatMap((term) =>
            fuse.search(term).map((result) => result.item)
          );
        } else {
          searchResults = fuse.search(tag).map((result) => result.item);
        }

        return res.status(200).json({
          results: searchResults,
        });
      } catch (error) {
        console.log("in catch block", error);
        return res.status(500).json({
          error: "internal server error",
        });
      }
    });
  } catch (error) {
    console.log("out catch block", error);
    return res.status(500).json({
      error: "api verification failed",
    });
  }
}
