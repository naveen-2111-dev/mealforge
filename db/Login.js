export default async function UserLogin(email, password) {
  try {
    console.log("db", email, password);
    const result = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!result.ok) {
      throw new Error("Internal server error");
    }

    return;
  } catch (error) {
    console.error("Failed to register:", error);
  }
}
