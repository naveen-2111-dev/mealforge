import ConnectDb from "@/lib/connect";
import validateInput from "@/utils/joi";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

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

    const db = await ConnectDb();
    const existingUser = await db.UserSchema.findOne({ mailId: email });
    if (!existingUser) {
      return res.status(400).json({
        message: "User not found.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect password.",
      });
    }

    // ------------------------------------------
    const secret = process.env.JWT_SECRET;
    const payload = {
      Email: email,
    };
    const options = { expiresIn: "1h" };

    const Access = jwt.sign(payload, secret, options);

    const cookieData = JSON.stringify({
      access: Access,
      email: email,
    });

    res.setHeader(
      "Set-Cookie",
      serialize("Token", cookieData, {
        path: "/",
        // httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
      })
    );
    // ------------------------------------------

    return res.status(200).json({
      message: "Login successful.",
      email: existingUser.email,
      access: Access,
    });
  } catch (error) {
    console.error("Error in /api/login:", error);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}
