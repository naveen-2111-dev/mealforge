import React, { useState } from "react";
import { MdFastfood } from "react-icons/md";
import { FiPlay, FiRefreshCcw } from "react-icons/fi";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import GetRecipe from "@/db/Get";
import "@/custom/custom.css";

export default function Runner() {
  const [code] = useState(`
const axios = require('axios');

const url = "https://mealforge.vercel.app/api/recipes";
const headers = {
  "Content-Type": "application/json",
  x-api-key: process.env.API_KEY,
  x-email: "navexxx@gmail.com",
};

//const data = {
//  key: "value"
//}; user only for post method

axios.get(url, { headers })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error("Error:", error);
  });
  `);

  const [pages, setPages] = useState("1");
  const [sliderRef] = useKeenSlider();
  const [recipe, setRecipe] = useState([]);

  const HandleRun = async (e) => {
    try {
      e.preventDefault();
      const result = await GetRecipe(pages);
      setRecipe(result);
    } catch (error) {
      throw new Error("failed to fetch");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col justify-start items-start space-y-6">
          <h1 className="text-5xl font-extrabold text-black flex items-center gap-4">
            Get Recipes <MdFastfood className="text-black" size={50} />
          </h1>
          <p className="text-black text-xl leading-relaxed">
            Integrate seamlessly with the MealForge API using
            <span className="font-semibold">JavaScript</span>,
            <span className="font-semibold">Python</span>, and more to fetch
            recipes from a robust database of over
            <span className="font-semibold">36,000 entries</span>, tailored for
            developers to create delightful culinary experiences.
          </p>

          <div
            ref={sliderRef}
            className="keen-slider w-full mt-6 h-full overflow-y-auto"
            style={{ maxWidth: "500px" }}
          >
            {recipe.length > 0 ? (
              recipe.map((rec, index) => (
                <div
                  key={index}
                  className="keen-slider__slide flex justify-center items-center w-24 h-24 bg-blue-500 rounded-lg"
                >
                  <div className="p-3 capitalize">
                    <p>recipeName : {rec.name}</p>
                    <p>duration : {rec.minutes}</p>
                    <p>
                      calories: {rec.nutrition.calories}, fat:
                      {rec.nutrition.fat}, sugar:
                      {rec.nutrition.sugar}, sodium: {rec.nutrition.sodium},
                      protein: {rec.nutrition.protein}, saturated_fat:
                      {rec.nutrition.saturated_fat}, carbohydrates:
                      {rec.nutrition.carbohydrates},
                    </p>
                    <p>{rec.n_steps}</p>
                    <p>{rec.ingredients.join(", ")}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="keen-slider__slide flex justify-center items-center w-24 h-24 bg-gray-500 rounded-lg">
                <p className="flex flex-col items-center justify-center text-sm gap-3">
                  Fetch recipe <FiRefreshCcw className="refresh" />
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col w-full bg-black rounded-lg">
          <div className="flex justify-between px-2">
            <div className="flex justify-start gap-2 p-3 w-1/2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>

            <div className="flex items-center gap-2 text-white">
              <label htmlFor="pages" className="text-sm font-semibold">
                Pages:
              </label>
              <input
                id="pages"
                type="text"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                className="w-16 bg-gray-700 text-white text-center rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            <button className="flex items-center gap-2 text-white p-2">
              Run
              <FiPlay />
            </button>
          </div>

          <div className="flex-1 text-white w-full p-4">
            <textarea
              value={code}
              readOnly
              className="w-full h-96 bg-black text-white font-mono text-sm p-4 rounded-lg border-none outline-none"
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
