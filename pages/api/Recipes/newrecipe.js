import Joi from "joi";
import ConnectDb from "@/lib/connect";
import { isApivalid } from "../middleware";

export default async function POST(req, res) {
  try {
    await isApivalid(req, res, async () => {
      try {
        const email = req.apiKey.email;

        const schema = Joi.object({
          name: Joi.string()
            .min(3)
            .max(20)
            .required()
            .pattern(new RegExp("^[a-zA-Z]+$"))
            .messages({
              "string.pattern.base":
                "Name can only contain letters, numbers, and spaces.",
            }),
          minutes: Joi.number().integer().min(1).max(300).required(),
          submitted: Joi.date().iso().required(),
          tags: Joi.array().items(Joi.string().min(2).max(50)).required(),
          nutrition: Joi.object({
            calories: Joi.number().integer().min(0),
            fat: Joi.number().integer().min(0),
            sugar: Joi.number().integer().min(0),
            sodium: Joi.number().integer().min(0),
            protein: Joi.number().integer().min(0),
            saturated_fat: Joi.number().integer().min(0),
            carbohydrates: Joi.number().integer().min(0),
          }).required(),
          nsteps: Joi.number().integer().min(1).required(),
          steps: Joi.array()
            .items(Joi.string().min(2).max(500).required())
            .required(),
          description: Joi.string().min(10).max(1000).required(),
          ingredients: Joi.array()
            .items(Joi.string().min(3).max(100).required())
            .required(),
          ningredients: Joi.number().integer().min(1).required(),
        });

        const { error, value } = schema.validate(req.body, {
          abortEarly: false,
        });

        if (error) {
          return res.status(400).json({
            message: "Validation failed",
            details: error.details,
          });
        }

        const {
          name,
          minutes,
          submitted,
          tags,
          nutrition,
          nsteps,
          steps,
          description,
          ingredients,
          ningredients,
        } = value;

        if (!email) {
          return res.status(400).json({
            message: "generate apikey...!",
          });
        }

        const db = await ConnectDb();
        const Finduser = await db.UserSchema.findOne({ mailId: email });
        if (!Finduser) {
          return res.status(400).json({
            error: "user not found",
          });
        }

        const result = await db.Recipe.insertOne({
          createdBy: Finduser._id,
          name: name,
          id: Math.floor(Math.random() * 1000),
          minutes: minutes,
          contributor_id: Finduser._id,
          submitted: submitted,
          tags: tags,
          nutrition: nutrition,
          n_steps: nsteps,
          steps: steps,
          description: description,
          ingredients: ingredients,
          n_ingredients: ningredients,
        });

        if (!result.insertedId) {
          return res.status(400).json({
            message: "failed to add data",
          });
        }

        return res.status(200).json({
          message: "data added successfully",
          data: result,
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
