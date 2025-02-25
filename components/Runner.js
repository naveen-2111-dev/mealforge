import React from "react";
import Link from "next/link";
import { MdFastfood } from "react-icons/md";
import { FiMail, FiTwitter, FiGithub } from "react-icons/fi";
import "@/custom/custom.css";

export default function Runner() {
  return (
    <footer className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
      <div className="w-full max-w-6xl flex flex-col gap-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-5xl font-extrabold flex items-center gap-4">
            MealForge API <MdFastfood size={50} />
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl">
            The MealForge API provides developers with access to a vast database
            of recipes, nutritional information, and cooking steps. Seamlessly
            integrate it into your projects to enhance culinary experiences.
          </p>
        </div>

        <div className="border-t border-gray-700 w-full pt-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="#" className="hover:underline">
              API Documentation
            </Link>
            <Link href="#" className="hover:underline">
              FAQ
            </Link>
            <Link href="#" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <a
            href="mailto:dev.naveen.rajan.m@gmail.com"
            className="hover:text-blue-400"
          >
            <FiMail size={24} />
          </a>
          <a
            href="#"
            className="hover:text-blue-400"
          >
            <FiTwitter size={24} />
          </a>
          <a
            href="https://github.com/naveen-2111-dev/mealforge"
            className="hover:text-blue-400"
          >
            <FiGithub size={24} />
          </a>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          © 2025 MealForge API. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
