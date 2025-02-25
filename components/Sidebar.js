import { FiHome, FiGrid, FiFileText, FiKey } from "react-icons/fi";
import Link from "next/link";
import "tailwindcss/tailwind.css";

export default function Sidebar() {
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

      <div className="mt-auto">
        <button
          className="w-full p-3 flex rounded-md items-center gap-2 bg-blue-600 hover:bg-blue-500"
        >
          <FiKey /> Generate API Key
        </button>
      </div>
    </div>
  );
}
