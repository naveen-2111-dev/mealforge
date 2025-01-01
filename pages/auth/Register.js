import Head from "next/head";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Register from "@/db/Register";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const reg = async (e) => {
    e.preventDefault();
    try {
      await Register(email, password);
      router.push("/auth/Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      <Head>
        <title>Register</title>
      </Head>
      <div className="w-full max-w-3xl flex flex-col md:flex-row items-stretch shadow-lg rounded-lg overflow-hidden bg-white">
        <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center text-center">
          <Image
            src={logo}
            className="bg-black rounded-full"
            height={100}
            width={100}
            alt="Logo"
          />
          <h1 className="text-2xl md:text-2xl font-bold mt-4 whitespace-nowrap">
            signup with MealForge
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Get your recipe by integrating MealForge into your application
          </p>
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email or phone
              </label>
              <div className="flex flex-col gap-4">
                <input
                  id="email"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
                <input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full mb-12 px-4 py-2 border rounded-lg focus:outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={reg}
              className="w-full  py-2 text-white bg-black rounded-lg"
            >
              Register
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-600">
            <p>
              Not your computer? Use a Private Window to sign in.{" "}
              <a href="#" className="text-black font-semibold hover:underline">
                Learn more
              </a>
            </p>
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/auth/Login"
              className="text-sm text-black hover:underline"
            >
              Already a user?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
