import ConnectDb from "@/lib/connect";

export async function CountUpdater(UserID) {
  try {
    if (!UserID) {
      console.log("Invalid input. Please check your details and try again.");
      return;
    }

    const db = await ConnectDb();
    const User = await db.UserSchema.findOneAndUpdate(
      {
        mailId: UserID,
      },
      {
        $inc: {
          reqcount: 1,
        },
      },
      { new: true, upsert: true }
    );

    return User;
  } catch (error) {
    console.log("Internal server error:", error);
  }
}
