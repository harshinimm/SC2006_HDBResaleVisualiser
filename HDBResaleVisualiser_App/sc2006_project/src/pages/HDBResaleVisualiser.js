import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API_URL = "http://127.0.0.1:8000/api/resale/";

export default function HDBResaleVisualizer() {
  const { mode } = useParams(); // either 'single' or 'multi'
  const location = useLocation();
  const {
    selectedDistricts = [],
    selectedRoomType = "",
    selectedDistrict = "",
    selectedRoomTypes = [],
  } = location.state || {};

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      if (mode === "multi" && selectedDistricts.length && selectedRoomType) {
        fetchMultiDistrictData();
      }

      else if (mode === "single" && selectedDistrict && selectedRoomTypes.length) {
        fetchSingleDistrictData();
      }
      setHasFetched(true);
    }
  }, [mode, selectedDistricts, selectedRoomType, selectedDistrict, selectedRoomTypes, hasFetched]);

  const fetchSingleDistrictData = () => {
      { /* TO BE UPDATED
        *
        *
        */
      }
    console.log("Single-district chart view is currently disabled.");
  }
  const fetchMultiDistrictData = () => {
    setLoading(true);
    setError(null);

    const queryParams = new URLSearchParams();
    selectedDistricts.forEach((town) => queryParams.append("towns", town));
    queryParams.append("room_type", selectedRoomType);
    queryParams.append("type", "price_trends");

    axios
      .get(`${API_URL}resale_analysis/?${queryParams.toString()}`)
      .then((res) => processChartData(res.data, selectedDistricts, "town"))
      .catch((err) => handleError(err))
      .finally(() => setLoading(false));
  };

  const processChartData = (data, categories, key) => {
    if (!data.length) {
      setError("No data found for the selected criteria.");
      return;
    }

    const yKey =
      data[0].resale_price !== undefined
        ? "resale_price"
        : data[0].avg_price !== undefined
        ? "avg_price"
        : null;

    if (!yKey) {
      setError("Unexpected data format from server.");
      return;
    }

    const uniqueYears = [...new Set(data.map((d) => Number(d.year)))].sort();

    const datasets = categories.map((category) => {
      const filtered = data
        .filter((d) => d[key].toUpperCase() === category.toUpperCase())
        .sort((a, b) => a.year - b.year);

      return {
        label: category,
        data: uniqueYears.map((year) => {
          const match = filtered.find((d) => Number(d.year) === year);
          return match ? parseFloat(match[yKey]) : null;
        }),
        borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        tension: 0.1,
        fill: false,
      };
    });

    setChartData({ labels: uniqueYears, datasets });
  };

  const handleError = (err) => {
    console.error("Fetch error:", err);
    setError("Failed to load data. Please try again.");
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 18,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text:
          mode === "multi"
            ? "Compare Same Room Type in Multiple Districts"
            : `Compare Multiple Room Types in ${selectedDistrict}`,
        font: { size: 16 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
          font: { size: 16 },
        },
      },
      y: {
        title: {
          display: true,
          text: "Resale Price (SGD)",
          font: { size: 16 },
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white text-red-900">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mt-6">HDB Resale Price Visualizer</h1>

      <div className="w-3/4 mx-auto mt-3 p-4 bg-white rounded-lg shadow">
        {loading && <p className="text-blue-500 mt-4">Loading...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {mode === "multi" && chartData && (
          <div className="mt-1">
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
        
        
        {mode === "single" && (
          <p className="text-center text-lg font-semibold mt-6 text-yellow-600">
            Single-district chart feature is currently not available. 
            {/* ^UPDATE PLACEHOLDER
            *
            *
            */}
          </p>
        )}
      </div>
    </div>
  );
}