<<<<<<< HEAD
export default function SearchSection({ search, setSearch }) {
    return (
      <header className="text-center py-20 bg-gradient-to-b from-white to-red-300">
        <h2 className="text-4xl font-extrabold">Find Your Ideal HDB Resale Flat</h2>
        <p className="mt-3 text-lg">Compare prices, analyze trends, and make informed decisions.</p>
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            className="p-3 w-80 border border-red-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Search by location, estate, or flat type"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-red-600 text-white px-6 py-3 rounded-r-lg hover:bg-red-700 transition">
            Search
          </button>
        </div>
      </header>
    );
  }
    
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [yearFilter, setYearFilter] = useState("");

    const handleSearch = () => {
        if (!searchTerm.trim() && !yearFilter.trim()) {
            alert("🚨 Please enter a district or a year to search.");
            return;
        }

        const params = new URLSearchParams();
        if (searchTerm.trim()) params.set("district", searchTerm.trim());
        if (yearFilter.trim()) {
            params.set("startYear", yearFilter.trim());
            params.set("endYear", yearFilter.trim());
        }
        
        navigate(`/search-results?${params.toString()}`);
    };

    return (
        <header className="text-center py-16 bg-gradient-to-b from-white to-red-300">
            <h2 className="text-4xl font-extrabold">Find Past HDB Resale Transactions</h2>
            <p className="mt-3 text-lg">Search by district and/or year to see past resale prices.</p>

            {/* Search Inputs */}
            <div className="mt-6 flex justify-center gap-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by district (e.g., Woodlands)"
                    className="border px-4 py-3 rounded-lg w-96"
                />
                <input
                    type="number"
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    placeholder="Year (optional)"
                    className="border px-4 py-3 rounded-lg w-48"
                />
                <button
                    className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition"
                    onClick={handleSearch}
                >
                    🔍 Search
                </button>
            </div>
        </header>
    );
};

export default SearchSection;
>>>>>>> a775301a (Updated frontend with latest changes)
