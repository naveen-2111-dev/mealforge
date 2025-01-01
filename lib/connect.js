import { MongoClient } from "mongodb";

const Uri = process.env.DATABASE_URL;
if (!Uri) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

const Client = new MongoClient(Uri);
let isConnected = false;

export default async function ConnectDb() {
  try {
    if (!isConnected) {
      await Client.connect();
      isConnected = true;
      console.log("Connected to MongoDB");
    }
    const db = Client.db("recipe");
    const UserSchema = db.collection("userSchema");
    const APIschema = db.collection("Apikey");
    const Recipe = db.collection("recipes");
    return { UserSchema, APIschema, Recipe };
  } catch (err) {
    console.error("Database connection failed:", err);
    throw new Error("invalid url provided");
  }
}
