"use client";

import { useState, useEffect, useRef } from "react";
import Mac from "@/public/mac.png";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { GiBrain } from "react-icons/gi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const searchInputRef = useRef(null);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (
        e.ctrlKey &&
        !e.altKey &&
        !e.shiftKey &&
        !e.metaKey &&
        e.key === "Control"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <nav className="flex justify-between items-center px-4 py-3 bg-black text-white sticky top-0 z-50">
      <div className="flex items-center">
        <Image src={Logo} alt="logo" className="h-10 w-10" />
      </div>

      <div className="md:hidden flex items-center">
        <button className="text-white focus:outline-none" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`hidden md:flex gap-6 items-center ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        <ul className="flex gap-4 md:gap-6 items-center">
          <Link
            href="#"
            className="hover:text-gray-300 cursor-pointer flex items-center gap-2"
          >
            Guide <GiBrain />
          </Link>
          <Link
            href="/c/dashboard"
            className="hover:text-gray-300 cursor-pointer"
          >
            Dashboard
          </Link>
          <Link href="#" className="hover:text-gray-300 cursor-pointer">
            Home
          </Link>
          <Link href="#" className="hover:text-gray-300 cursor-pointer">
            About
          </Link>
        </ul>
        <div className="flex items-center bg-gray-800 p-2 rounded-lg">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search"
            className="bg-gray-800 border-none outline-none text-white"
          />
          <p className="flex md:flex items-center ml-2">
            Ctrl + <Image src={Mac} alt="mac" className="h-5 w-5" />
          </p>
        </div>

        <a
          href="https://github.com/naveen-2111-dev/mealforge"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.04 3.29 9.33 7.88 10.89.58.11.79-.25.79-.55 0-.28-.01-1.02-.02-2.01-3.23.7-3.91-1.56-3.91-1.56-.53-1.35-1.29-1.71-1.29-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.74 1.26 3.41.96.11-.75.4-1.26.73-1.55-2.49-.28-5.11-1.24-5.11-5.5 0-1.22.43-2.23 1.14-3.02-.12-.28-.5-1.41.11-2.94 0 0 1.1-.35 3.61 1.34 1.05-.29 2.18-.44 3.29-.44 1.11 0 2.24.15 3.29.44 2.51-1.7 3.61-1.34 3.61-1.34.61 1.53.23 2.66.11 2.94.71.79 1.14 1.8 1.14 3.02 0 4.27-2.63 5.22-5.12 5.5.41.35.77.96.77 1.88 0 1.36-.01 2.46-.01 2.8 0 .31.2.66.79.55C20.71 21.33 24 16.04 24 12c0-6.63-5.37-12-12-12z"
              fill="#FFFFFF"
            />
          </svg>
        </a>
        <button
          className="px-4 py-2 bg-white text-black text-sm rounded hover:bg-gray-200 transition"
          onClick={() => {
            router.push("/auth/Login/");
            console.log("clicked");
          }}
        >
          Login
        </button>
      </div>

      <div
        className={`md:hidden ${
          menuOpen ? "block" : "hidden"
        } absolute top-14 right-0 w-full bg-black text-white`}
      >
        <ul className="flex flex-col gap-4 p-4">
          <Link
            href="#"
            className="hover:text-gray-300 cursor-pointer flex items-center gap-3"
          >
            Guide <GiBrain />
          </Link>
          <Link
            href="/c/dashboard"
            className="hover:text-gray-300 cursor-pointer"
          >
            Dashboard
          </Link>
          <Link href="#" className="hover:text-gray-300 cursor-pointer">
            Home
          </Link>
          <Link href="#" className="hover:text-gray-300 cursor-pointer">
            About
          </Link>
        </ul>
        <button className="px-4 py-2 bg-white text-black text-sm hover:bg-gray-200 transition w-full">
          Login
        </button>
      </div>
    </nav>
  );
}
