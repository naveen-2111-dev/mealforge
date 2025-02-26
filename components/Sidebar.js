"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiFileText, FiGrid, FiHome, FiKey, FiCopy } from "react-icons/fi";

export default function Sidebar() {
  const [apiKeys, setApiKeys] = useState([]);
  const [storedKeys, setStoredKeys] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("Keys");
    if (stored) {
      setStoredKeys(stored.split(","));
    }
  }, []);

  const ApiKeyFetch = async () => {
    try {
      const cookie_res = Cookies.get("Token");
      if (!cookie_res) {
        console.error("No token found in cookies.");
        return;
      }

      const Json_res = JSON.parse(cookie_res);
      const token = Json_res.access;

      const res = await fetch("/api/ApiKey", {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
          "x-access-token": `Bearer ${token}`,
        },
      });

      const res_Json = await res.json();

      if (res.ok && res_Json.Key) {
        setApiKeys((prev) => [...prev, res_Json.Key]);
        setStoredKeys((prev) => {
          const newKeys = [...prev, res_Json.Key];
          localStorage.setItem("Keys", JSON.stringify(newKeys));
          return newKeys;
        });
      } else {
        console.error("Error:", res_Json.error);
      }
    } catch (error) {
      console.error("Error fetching API key:", error);
    }
  };

  const copyToClipboard = (key) => {
    navigator.clipboard.writeText(key);
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-6 gap-6">
      <h2 className="text-xl font-bold">Mealforge</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-2 hover:text-blue-400">
          <FiHome /> Home
        </Link>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 hover:text-blue-400"
        >
          <FiGrid /> Dashboard
        </Link>
        <Link
          href="/docs"
          className="flex items-center gap-2 hover:text-blue-400"
        >
          <FiFileText /> API Docs
        </Link>
      </nav>

      <div className="mt-auto w-full">
        {storedKeys.length > 0 && (
          <div className="mb-4 p-3 bg-gray-800 rounded-md">
            <h3 className="text-sm font-semibold mb-2">Stored API Keys:</h3>
            <ul className="space-y-2">
              {storedKeys.map((key, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-700 rounded-md text-sm"
                >
                  <span className="truncate">{key}</span>
                  <button
                    onClick={() => copyToClipboard(key)}
                    className="p-1 bg-gray-600 rounded hover:bg-gray-500"
                  >
                    <FiCopy />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={ApiKeyFetch}
          className="w-full p-3 flex rounded-md items-center gap-2 bg-blue-600 hover:bg-blue-500"
        >
          <FiKey /> Generate API Key
        </button>
      </div>
    </div>
  );
}
