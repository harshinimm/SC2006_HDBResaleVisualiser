import React from "react";
import { useNavigate } from "react-router-dom";

const MapSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-red-900">
      <h1 className="text-3xl font-bold mb-6">Choose a Comparison Type</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Option 1: Compare Same Room Type Over 5 Districts */}
        <button
          className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all"
          onClick={() => navigate("/map?mode=multi-district")}
        >
          Compare Same Room Type in Multiple Districts
        </button>

        {/* Option 2: Compare Different Room Types in 1 District */}
        <button
          className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-all"
          onClick={() => navigate("/map?mode=single-district")}
        >
          Compare Different Room Types in One District
        </button>
      </div>

      {/* Back to Homepage Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition-all"
      >
        ⬅ Back to Homepage
      </button>
    </div>
  );
};

export default MapSelection;
