import ConnectDb from "@/lib/connect";
import validateInput from "@/utils/joi";
import bcrypt from "bcrypt";

export default async function POST(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid input. Please check your details and try again.",
      });
    }

    const result = await validateInput(email, password);
    if (!result.isValid) {
      return res.status(400).json({
        message: result.message || "Validation failed",
      });
    }

    const symbol = "@";
    const username = "cook_" + email.split(symbol)[0];
    const hash = await bcrypt.hash(password, 10);

    const db = await ConnectDb();
    const existingUser = await db.UserSchema.findOne({ mailId: email });
    if (existingUser) {
      return res.status(400).json({
        message: "alredy a user!",
      });
    }
    const mes = await db.UserSchema.insertOne({
      mailId: email,
      password: hash,
      username: username,
    });

    if (!mes.insertedId) {
      return res.status(500).json({
        message: "Failed to register user.",
      });
    }

    return res.status(200).json({
      message: "Validation and registration successful.",
      email: email,
      username: username,
    });
  } catch (error) {
    console.error("Error in /api/Register:", error);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}
