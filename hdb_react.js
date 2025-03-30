import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { Button, Select } from "@/components/ui/button";

export default function HDBResaleVisualizer() {
  const [towns, setTowns] = useState([]);
  const [selectedTowns, setSelectedTowns] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api/";

  useEffect(() => {
    axios.get(`${API_URL}towns/`).then((res) => {
      setTowns(res.data.towns);
    });
  }, []);

  const fetchData = (type) => {
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
      .catch((err) => {
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">HDB Resale Price Visualizer</h1>
      <Select
        multiple
        onChange={(e) => setSelectedTowns([...e.target.selectedOptions].map((o) => o.value))}
      >
        <option value="" disabled>Select towns to compare</option>
        {towns.map((town) => (
          <option key={town} value={town}>
            {town}
          </option>
        ))}
      </Select>
      <Button onClick={() => fetchData("price_trends")}>Show Price Trends</Button>
      <Button onClick={() => fetchData("volatility")}>Show Volatility</Button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {chartData && <Line data={chartData} />}
    </div>
  );
}
