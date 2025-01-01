export default async function Register(email,password){
    try {
      console.log("db",email,password)
    const result = await fetch("/api/Register", {
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

    const data = await result.json();
    console.log(result, "\n", data);
    localStorage.setItem("username", data.username);
  } catch (error) {
    console.error("Failed to register:", error);
  }
};
