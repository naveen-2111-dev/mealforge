import ConnectDb from "@/lib/connect";
import { isApivalid } from "../middleware";
import Fuse from "fuse.js";

export default async function POST(req, res) {
  try {
    await isApivalid(req, res, async () => {
      try {
        const { ingredients, threshold } = req.body;
        if (!ingredients) {
          return res.status(400).json({
            error: "invalid format",
          });
        }

        if (Object.keys(req.query).length > 0) {
          return res.status(400).json({
            error: `/invalid/ not allowed`,
          });
        }

        const validThreshold =
          threshold !== undefined
            ? Math.min(Math.max(Number(threshold), 0), 1)
            : 0.6;

        const db = await ConnectDb();
        const result = await db.Recipe.find({}).toArray();

        const options = {
          keys: ["ingredients"],
          threshold: validThreshold,
          limit: 10,
        };

        const fuse = new Fuse(result, options);
        let searchResults = [];

        if (Array.isArray(ingredients)) {
          searchResults = ingredients.flatMap((term) =>
            fuse.search(term).map((result) => result.item)
          );
        } else {
          searchResults = fuse.search(ingredients).map((result) => result.item);
        }
        return res.status(200).json({
          results: searchResults,
        });
      } catch (error) {
        console.log("in", error);
        return res.status(500).json({
          error: "internal server error",
        });
      }
    });
  } catch (error) {
    console.log("out", error);
    return res.status(500).json({
      error: "api verification failed",
    });
  }
}
