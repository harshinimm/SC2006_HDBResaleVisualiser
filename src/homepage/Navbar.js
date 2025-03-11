import { useState } from "react";
import LoginModal from "../login/LoginModal";

export default function Navbar({ isLoggedIn, handleLogout, handleLoginOpen }) {
  return (
    <nav className="bg-red-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">🏠 HDB Resale Compare</h1>
      <div className="space-x-6">
        <a href="#" className="hover:text-gray-200 transition">Compare Prices</a>
        <a href="#" className="hover:text-gray-200 transition">Map View</a>
        <a href="#" className="hover:text-gray-200 transition">Insights & Trends</a>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="bg-white text-red-600 px-4 py-2 rounded-lg">
            Logout
          </button>
        ) : (
          <button onClick={handleLoginOpen} className="bg-white text-red-600 px-4 py-2 rounded-lg">
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
