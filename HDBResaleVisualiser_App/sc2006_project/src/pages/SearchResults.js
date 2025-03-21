import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../homepage/Navbar";

const mockData = [
    { id: 1, district: "Woodlands", year: 1995, month: "June", price: 250000, flatType: "4-Room", details: "Lease 99 years, 95 sqm" },
    { id: 2, district: "Woodlands", year: 2000, month: "March", price: 320000, flatType: "5-Room", details: "Lease 99 years, 110 sqm" },
    { id: 3, district: "Bishan", year: 2010, month: "August", price: 450000, flatType: "Executive", details: "Lease 99 years, 130 sqm" },
    { id: 4, district: "Bishan", year: 2018, month: "July", price: 520000, flatType: "5-Room", details: "Lease 99 years, 120 sqm" },
];

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    
    // Get search parameters from URL
    const initialDistrict = searchParams.get("district") || "";
    const initialStartYear = searchParams.get("startYear") || "";
    const initialEndYear = searchParams.get("endYear") || "";

    const [district, setDistrict] = useState(initialDistrict);
    const [startYear, setStartYear] = useState(initialStartYear);
    const [endYear, setEndYear] = useState(initialEndYear);
    const [sortOrder, setSortOrder] = useState("asc");
    const [filteredResults, setFilteredResults] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);

    useEffect(() => {
        filterResults();
    }, []);

    const filterResults = () => {
        let results = mockData.filter((item) => 
            (!district || item.district.toLowerCase().includes(district.toLowerCase())) &&
            (!startYear || item.year >= parseInt(startYear)) &&
            (!endYear || item.year <= parseInt(endYear))
        );

        if (sortOrder === "asc") {
            results.sort((a, b) => a.price - b.price);
        } else {
            results.sort((a, b) => b.price - a.price);
        }

        setFilteredResults(results);
    };

    const handleFilter = () => {
        filterResults();
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            filterResults();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-red-900">
            <Navbar />

            <div className="max-w-5xl mx-auto mt-10 px-6">
                <h1 className="text-4xl font-bold text-center mb-10">🏠 HDB Past Listings</h1>

                {/* Filter Controls */}
                <div className="bg-white p-6 shadow-md rounded-lg mb-10">
                    <h2 className="text-xl font-semibold mb-3">🔎 Filter Listings</h2>
                    <div className="flex flex-wrap gap-4 items-center">
                        {/* District Filter */}
                        <input
                            type="text"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            placeholder="Search by District"
                            className="border px-4 py-2 rounded-lg w-64"
                            onKeyPress={handleKeyPress}
                        />

                        {/* Start Year Filter */}
                        <input
                            type="number"
                            value={startYear}
                            onChange={(e) => setStartYear(e.target.value)}
                            placeholder="Start Year"
                            className="border px-4 py-2 rounded-lg w-32"
                            onKeyPress={handleKeyPress}
                        />

                        {/* End Year Filter */}
                        <input
                            type="number"
                            value={endYear}
                            onChange={(e) => setEndYear(e.target.value)}
                            placeholder="End Year"
                            className="border px-4 py-2 rounded-lg w-32"
                            onKeyPress={handleKeyPress}
                        />

                        {/* Sort by Price */}
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="border px-4 py-2 rounded-lg"
                        >
                            <option value="asc">Sort by Price: Low to High</option>
                            <option value="desc">Sort by Price: High to Low</option>
                        </select>

                        {/* 🔹 Apply Filter Button */}
                        <button
                            onClick={handleFilter}
                            className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition-all"
                        >
                            ✅ Apply Filter
                        </button>
                    </div>
                </div>

                {/* Display Results */}
                {filteredResults.length > 0 ? (
                    <div className="bg-white p-6 shadow-md rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">📋 Search Results</h2>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-red-600 text-white">
                                    <th className="border px-6 py-3">District</th>
                                    <th className="border px-6 py-3">Year</th>
                                    <th className="border px-6 py-3">Month</th>
                                    <th className="border px-6 py-3">Flat Type</th>
                                    <th className="border px-6 py-3">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResults.map((item) => (
                                    <tr 
                                        key={item.id} 
                                        className="border bg-gray-50 hover:bg-gray-200 transition cursor-pointer"
                                        onClick={() => setSelectedListing(item)} // ✅ Open modal on click
                                    >
                                        <td className="border px-6 py-3 text-center">{item.district}</td>
                                        <td className="border px-6 py-3 text-center">{item.year}</td>
                                        <td className="border px-6 py-3 text-center">{item.month}</td>
                                        <td className="border px-6 py-3 text-center">{item.flatType}</td>
                                        <td className="border px-6 py-3 text-center">${item.price.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-white p-6 shadow-md rounded-lg text-center text-red-600 font-semibold">
                        ❌ No records found for this search.
                    </div>
                )}

                {/* Back to Homepage */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition-all"
                    >
                        ⬅ Back to Homepage
                    </button>
                </div>
            </div>

            {/* Modal for Listing Details */}
            {selectedListing && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    onClick={() => setSelectedListing(null)}
                >
                    <div 
                        className="bg-white p-6 rounded-lg shadow-lg w-96"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <h2 className="text-2xl font-bold mb-4">🏠 Listing Details</h2>
                        <p><strong>District:</strong> {selectedListing.district}</p>
                        <p><strong>Year:</strong> {selectedListing.year}</p>
                        <p><strong>Month:</strong> {selectedListing.month}</p>
                        <p><strong>Flat Type:</strong> {selectedListing.flatType}</p>
                        <p><strong>Price:</strong> ${selectedListing.price.toLocaleString()}</p>
                        <p><strong>Details:</strong> {selectedListing.details}</p>

                        <button 
                            onClick={() => setSelectedListing(null)} 
                            className="mt-4 px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
                        >
                            ❌ Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
