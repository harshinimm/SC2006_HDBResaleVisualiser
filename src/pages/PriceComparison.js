import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../homepage/Navbar"; // ✅ Import Navbar for consistency

const PriceComparison = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    
    const districts = searchParams.get("districts")?.split(",") || [];
    const startTime = searchParams.get("startTime") || "Unknown";
    const endTime = searchParams.get("endTime") || "Unknown";

    const [view, setView] = useState("table"); // "table" or "graph"

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-red-900">
            {/* ✅ Navbar at the top */}
            <Navbar />

            <div className="flex flex-col items-center mt-6">
                <h1 className="text-4xl font-bold my-6">📊 Price Comparison Results</h1>

                {/* New Header Displaying the Selected Districts & Time Range */}
                <div className="bg-white p-6 shadow-lg rounded-lg w-3/4 mb-6 text-center border border-gray-300">
                    <h2 className="text-2xl font-semibold">
                        Comparing Prices for:
                        <span className="text-red-600 font-bold"> {districts.join(", ")}</span>
                    </h2>
                    <h3 className="text-lg text-gray-700 mt-2">
                        Time Range: <span className="font-semibold">{startTime} - {endTime}</span>
                    </h3>
                </div>

                {/* View Toggle Buttons */}
                <div className="flex gap-4 mb-6">
                    <button
                        className={`px-6 py-3 font-bold rounded-lg transition ${
                            view === "table" ? "bg-blue-600 text-white shadow-md" : "bg-gray-300 text-black"
                        }`}
                        onClick={() => setView("table")}
                    >
                        📋 Table View
                    </button>

                    <button
                        className={`px-6 py-3 font-bold rounded-lg transition ${
                            view === "graph" ? "bg-blue-600 text-white shadow-md" : "bg-gray-300 text-black"
                        }`}
                        onClick={() => setView("graph")}
                    >
                        📈 Graph View
                    </button>
                </div>

                {/* Display Table or Graph */}
                {view === "table" ? (
                    <div className="bg-white p-6 shadow-md rounded-lg w-3/4 border border-gray-300">
                        <h2 className="text-xl font-semibold mb-4">📌 Table View</h2>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-red-600 text-white">
                                    <th className="border px-6 py-3">District</th>
                                    <th className="border px-6 py-3">Time Range</th>
                                    <th className="border px-6 py-3">Average Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {districts.map((district, index) => (
                                    <tr key={index} className="border bg-gray-50 hover:bg-gray-200 transition">
                                        <td className="border px-6 py-3 text-center">{district}</td>
                                        <td className="border px-6 py-3 text-center">{startTime} - {endTime}</td>
                                        <td className="border px-6 py-3 text-center">$XXX,XXX</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-white p-6 shadow-md rounded-lg w-3/4 border border-gray-300">
                        <h2 className="text-xl font-semibold mb-4">📈 Graph View (Coming Soon)</h2>
                    </div>
                )}

                {/* Back Button */}
                <button
                    onClick={() => navigate("/map-selection")}
                    className="mt-6 px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition-all"
                >
                    ⬅ Back to Selection
                </button>
            </div>
        </div>
    );
};

export default PriceComparison;
