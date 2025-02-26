import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar.js";
import {
  FiDatabase,
  FiAlertTriangle,
  FiClock,
  FiGlobe,
  FiActivity,
  FiZap,
} from "react-icons/fi";
import "tailwindcss/tailwind.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRequests: 0,
    totalErrors: 0,
    avgResponseTime: "0ms",
    peakTraffic: "N/A",
    mostUsedAPI: "/api/example",
    topLocations: ["N/A"],
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">
            API Dashboard
          </h1>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
            Settings
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <StatCard
            icon={<FiDatabase size={40} className="text-blue-500" />}
            title="Total Requests"
            value={stats.totalRequests}
          />
          <StatCard
            icon={<FiAlertTriangle size={40} className="text-red-500" />}
            title="Total Errors"
            value={stats.totalErrors}
          />
          <StatCard
            icon={<FiClock size={40} className="text-green-500" />}
            title="Avg Response Time"
            value={stats.avgResponseTime}
          />
          <StatCard
            icon={<FiActivity size={40} className="text-purple-500" />}
            title="Peak Traffic Time"
            value={stats.peakTraffic}
          />
          <StatCard
            icon={<FiGlobe size={40} className="text-yellow-500" />}
            title="Top Locations"
            value={stats.topLocations.join(", ")}
          />
          <StatCard
            icon={<FiZap size={40} className="text-yellow-500" />}
            title="Requests per minute"
            value={stats.topLocations.join(", ")}
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
