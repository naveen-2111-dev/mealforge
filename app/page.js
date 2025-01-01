"use client";

import Navbar from "@/components/Navbar";
import "@/custom/custom.css";
import Image from "next/image";
import Fire from "@/public/fire.gif";
import Runner from "@/components/Runner";
import Logo from "@/public/logo.png";

export default function Home() {
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  return (
    <div className="textstyle">
      <Navbar />
      <div className="relative h-screen">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4">
          <Image
            src={Logo}
            alt="logo"
            className="bg-black rounded-full mx-auto"
            height={100}
            width={100}
          />
          <h1 className="text-black text-3xl sm:text-5xl lg:text-7xl whitespace-nowrap mt-4">
            Welcome to MealForge
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-lg sm:max-w-xl mx-auto mt-4 mb-6">
            &quot;MealForge is an intuitive recipe API service that helps
            developers easily integrate recipes and ingredient search into their
            apps.&quot;
          </p>
          <div className="p-2 flex flex-row sm:flex-row items-center gap-4 bg-white shadow-lg rounded-full w-fit mx-auto mt-8">
            <input
              type="text"
              placeholder="Search recipes..."
              className="p-4 w-72 sm:w-96 rounded-full outline-none border text-black border-gray-300"
            />
            <button className="p-3 bg-black hover:bg-gray-800 text-white rounded-full shadow-lg group hover:bg-gradient-to-br hover:from-black hover:to-gray-800 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="text-black px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <Image src={Fire} alt="Trending" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl capitalize font-black">
            Popular Tags
          </h1>
        </div>
        <div className="mt-10">
          <ul className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            {[
              "ground-beef",
              "indian",
              "american",
              "pork-chops",
              "vegan",
              "non-vegetarian",
              "vegetarian",
            ].map((tag) => (
              <li
                key={tag}
                className="p-3 sm:p-4 border border-black rounded-full text-sm sm:text-base"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-black mt-20 px-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl capitalize font-black">
            Easy to Integrate
          </h1>
        </div>

        {[
          {
            title: "Python",
            code: `import requests

url = "https://mealforge.vercel.app/api"
headers = {
    "Content-Type": "application/json",
    "x-api-key": "<your_api_key>"
}
data = {
    "key": "value"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`,
          },
          {
            title: "Curl",
            code: `curl -X POST https://mealforge.vercel.app/api \\
-H "Content-Type: application/json" \\
-H "x-api-key: <your_api_key>" \\
-d '{
  "key": "value"
}'`,
          },
          {
            title: "React",
            code: `import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("https://mealforge.vercel.app/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "<your_api_key>",
      },
      body: JSON.stringify({
        key: "value",
      }),
    })
      .then((response) => response.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}

export default App;`,
          },
        ].map((snippet, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg mt-8">
            <div className="flex items-center justify-between bg-black text-white text-lg font-bold p-3 rounded-t-lg">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm font-medium">{snippet.title}</span>
            </div>
            <div className="bg-black text-white p-4 overflow-x-auto max-w-full rounded-b-lg relative">
              <div className="whitespace-pre overflow-x-auto">
                <code className="block">{snippet.code}</code>
              </div>
              <button
                onClick={() => handleCopy(snippet.code)}
                className="absolute top-2 right-2 p-2 bg-gray-800 text-white rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-copy"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Runner />
      </div>
    </div>
  );
}
