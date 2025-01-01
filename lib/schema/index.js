import mongoose, { Schema } from "mongoose";

const UserSchema = mongoose.Schema(
  {
    mailId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    Timestamp: true,
  }
);

const UserDb = await mongoose.model("userSchema", UserSchema);

const Apikey = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    Ip: {
      type: String,
      required: true,
    },
    KeyName: {
      type: String,
      default: "test",
      required: true,
    },
    Key: {
      type: String,
      required: true,
    },
    expires: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 0,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { Timestamp: true }
);

const ApikeyModel = mongoose.model("Apikey", Apikey);

const recipe = new mongoose.Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "userSchema",
    required: true,
  },
  name: String,
  id: Number,
  minutes: Number,
  contributor_id: Number,
  submitted: Date,
  tags: [String],
  nutrition: {
    calories: Number,
    fat: Number,
    sugar: Number,
    sodium: Number,
    protein: Number,
    saturated_fat: Number,
    carbohydrates: Number,
  },
  n_steps: Number,
  steps: [String],
  description: String,
  ingredients: [String],
  n_ingredients: Number,
});

const RecipeSchema = mongoose.model("recipes", recipe);

module.exports = { UserDb, ApikeyModel, RecipeSchema };
