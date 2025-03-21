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
