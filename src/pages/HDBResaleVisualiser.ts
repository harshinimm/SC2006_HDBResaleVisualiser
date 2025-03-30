// src/pages/HDBResaleVisualizer.js
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { Button } from "@/components/ui/button";

const API_URL = "http://localhost:8000/api/"; // Adjust to your Django backend URL

export default function HDBResaleVisualizer() {
  const [towns, setTowns] = useState([]);
  const [selectedTowns, setSelectedTowns] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch towns from Django backend
  useEffect(() => {
    axios.get(`${API_URL}towns/`)
      .then((res) => {
        setTowns(res.data.towns);
      })
      .catch(() => setError("Failed to fetch town list."));
  }, []);

  // Fetch data for price trends or volatility
  const fetchData = (type) => {
    if (selectedTowns.length === 0) {
      setError("Please select at least one town.");
      return;
    }

    setLoading(true);
    setError(null);
    
    axios
      .get(`${API_URL}resale_analysis/`, {
        params: { towns: selectedTowns, type },
      })
      .then((res) => {
        const data = res.data;
        setChartData({
          labels: [...new Set(data.map((d) => d.year))],
          datasets: selectedTowns.map((town) => ({
            label: town,
            data: data.filter((d) => d.town === town).map((d) => d.resale_price),
            borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            fill: false,
          })),
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">HDB Resale Price Visualizer</h1>

      <label className="block my-2 font-medium">Select towns:</label>
      <select
        multiple
        className="border rounded p-2 w-full"
        onChange={(e) => setSelectedTowns([...e.target.selectedOptions].map((o) => o.value))}
      >
        {towns.map((town) => (
          <option key={town} value={town}>
            {town}
          </option>
        ))}
      </select>

      <div className="flex gap-2 mt-4">
        <Button onClick={() => fetchData("price_trends")}>Show Price Trends</Button>
        <Button onClick={() => fetchData("volatility")}>Show Volatility</Button>
      </div>

      {loading && <p className="text-blue-500 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {chartData && (
        <div className="mt-6">
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
}
