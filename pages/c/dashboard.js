import React from "react";
import Sidebar from "@/components/Sidebar.js";
import { FiDatabase, FiUsers, FiZap } from "react-icons/fi";
import "tailwindcss/tailwind.css";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
          API Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <StatCard
            icon={<FiDatabase size={40} className="text-blue-500" />}
            title="Total Requests"
            value="12,345"
          />
          <StatCard
            icon={<FiUsers size={40} className="text-green-500" />}
            title="Active Users"
            value="1,234"
          />
          <StatCard
            icon={<FiZap size={40} className="text-yellow-500" />}
            title="Requests Per Minute"
            value="78"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white p-6 shadow-lg rounded-xl flex items-center gap-6 transition hover:scale-105 hover:shadow-xl">
      {icon}
      <div>
        <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
