import Cookies from "js-cookie";

export default async function GetRecipe(page) {
  try {
    const accessToken = Cookies.get("Token");
    if (!accessToken) {
      console.error("Access token not found.");
      return;
    }
    console.log(accessToken);

    const parsedToken = JSON.parse(accessToken);
    const Token = parsedToken.access;
    const Email = parsedToken.email;
    const queryParams = new URLSearchParams({
      page: page.toString(),
    }).toString();
    const result = await fetch(`/api/recipes?${queryParams}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-api": `Bearer ${Token}`,
        "x-email": Email,
      },
    });

    if (!result.ok) {
      throw new Error("Failed to fetch recipes.");
    }

    const data = await result.json();
    console.log("Recipe data:", data);
    return data;
  } catch (error) {
    console.log("error in fetching", error);
  }
}
