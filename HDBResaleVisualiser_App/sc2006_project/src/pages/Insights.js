import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Navbar from "../homepage/Navbar";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

const districts = [
    "Ang Mo Kio", "Bedok", "Bishan", "Boon Lay", "Bukit Batok", 
    "Bukit Merah", "Bukit Panjang", "Bukit Timah", "Central Area", "Changi",
    "Choa Chu Kang", "Clementi", "Geylang", "Hougang", "Jurong East",
    "Jurong West", "Kallang/Whampoa", "Marine Parade", "Pasir Ris", "Punggol",
    "Queenstown", "Sembawang", "Sengkang", "Serangoon", "Tampines", 
    "Toa Payoh", "Woodlands", "Yishun"
];

// ✅ Register Chart Components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// 📊 Mock Data for Resale Trends
const mockData = [
    { district: "Woodlands", year: 2010, price: 320000 },
    { district: "Woodlands", year: 2015, price: 380000 },
    { district: "Woodlands", year: 2020, price: 420000 },
    { district: "Bishan", year: 2010, price: 550000 },
    { district: "Bishan", year: 2015, price: 620000 },
    { district: "Bishan", year: 2020, price: 680000 },
    { district: "Tampines", year: 2010, price: 430000 },
    { district: "Tampines", year: 2015, price: 500000 },
    { district: "Tampines", year: 2020, price: 570000 },
];

const Insights = () => {
    const [selectedDistrict, setSelectedDistrict] = useState("Woodlands");

    // ✅ Filter Data for Selected District
    const filteredData = mockData.filter((d) => d.district === selectedDistrict);

    // 📊 Prepare Line Chart Data
    const lineChartData = {
        labels: filteredData.map((d) => d.year),
        datasets: [
            {
                label: `Resale Prices in ${selectedDistrict}`,
                data: filteredData.map((d) => d.price),
                borderColor: "#D72638", // 🔴 Red theme
                backgroundColor: "rgba(215, 38, 56, 0.2)",
                borderWidth: 3,
                pointRadius: 6,
                pointBackgroundColor: "#D72638",
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true, labels: { font: { size: 14, weight: "bold" } } },
            title: { display: true, text: "HDB Resale Price Trends", font: { size: 18, weight: "bold" } },
        },
        animation: false,
        scales: {
            y: {
                beginAtZero: false,
                suggestedMin: 200000,
                suggestedMax: 1000000,
                ticks: { font: { size: 12 } },
            },
            x: { grid: { display: false }, ticks: { font: { size: 12 } } },
        },
    };

    const lastPrice = filteredData[filteredData.length - 1].price;
    const predictedPrice = (lastPrice * 1.15).toFixed(2);

    const priceDifference = filteredData.length > 1
        ? filteredData[filteredData.length - 1].price - filteredData[0].price
        : 0;

    const trendMessage = priceDifference > 0
        ? `📈 Prices in ${selectedDistrict} have increased by $${priceDifference.toLocaleString()} since ${filteredData[0].year}.`
        : `📉 Prices in ${selectedDistrict} have decreased by $${Math.abs(priceDifference).toLocaleString()} since ${filteredData[0].year}.`;

    return (
        <div className="min-h-screen bg-gray-100 text-red-900">
            <Navbar />
            <div className="max-w-5xl mx-auto mt-12 px-6">
                <h1 className="text-5xl font-extrabold text-center mb-8 text-red-700">
                    📊 AI-Powered Insights & Trends
                </h1>

                {/* District Selection Dropdown */}
                <div className="mb-6">
                    <label className="text-lg font-semibold mr-3">Choose a District:</label>
                    <select 
                        value={selectedDistrict} 
                        onChange={(e) => setSelectedDistrict(e.target.value)} 
                        className="border px-4 py-2 rounded-lg bg-white shadow-sm"
                    >
                        {districts.map((district, index) => (
                            <option key={index} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 📈 Price Trend Chart */}
                <div className="bg-white p-8 shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold mb-6 text-red-700">📉 Resale Price Trend</h2>
                    <div className="h-80">
                        <Line data={lineChartData} options={lineChartOptions} />
                    </div>
                </div>

                {/* 🔮 AI-Powered Future Prediction */}
                <div className="mt-8 bg-white p-8 shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 text-purple-700">🔮 AI-Powered Prediction</h2>

                    <p className="text-lg text-gray-800">
                        🚀 <strong>Estimated 2025 Resale Price in {selectedDistrict}:</strong>&nbsp;
                        <span className="text-green-600 font-bold text-2xl">
                            ${predictedPrice}
                        </span>
                    </p>

                    <p className="text-gray-700 mt-3 text-lg">
                        📉 <strong>Best Time to Buy:</strong>&nbsp;
                        Based on past trends, prices <strong>increase by 15% every 5 years.</strong>&nbsp;
                        Buying <strong>now</strong> could be a smart move!
                    </p>
                </div>

                {/* 📊 Market Trend */}
                <div className="bg-white p-8 shadow-lg rounded-lg mt-8 text-center">
                    <h2 className="text-2xl font-bold mb-4 text-blue-700">📊 Market Trend</h2>
                    <p className={`text-xl font-semibold ${priceDifference > 0 ? "text-green-600" : "text-red-600"}`}>
                        {trendMessage}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Insights;
