<<<<<<< HEAD
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook

export default function FeaturesSection() {
  const navigate = useNavigate(); // ✅ Initialize navigation

  return (
    <section className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
=======
import { useNavigate } from "react-router-dom";

export default function FeaturesSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div 
        className="p-6 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition-all"
        onClick={() => navigate("/map-selection")}
      >
>>>>>>> a775301a (Updated frontend with latest changes)
        <h3 className="text-2xl font-bold">📊 Compare Prices</h3>
        <p className="text-red-700 mt-2">Analyze HDB resale price trends in different estates.</p>
      </div>

<<<<<<< HEAD
      {/* 🗺 Interactive Map Button (Fixed) */}
      <div 
        className="p-6 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition-all"
        onClick={() => navigate("/map-selection")} // ✅ Navigate to selection page first
=======
      <div 
        className="p-6 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition-all"
        onClick={() => navigate("/selection-mode")}
>>>>>>> a775301a (Updated frontend with latest changes)
      >
        <h3 className="text-2xl font-bold">🗺 Interactive Map</h3>
        <p className="text-red-700 mt-2">Explore price heatmaps across Singapore.</p>
      </div>

<<<<<<< HEAD
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
=======
      <div 
        className="p-6 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition-all"
        onClick={() => navigate("/insights")}
      >
>>>>>>> a775301a (Updated frontend with latest changes)
        <h3 className="text-2xl font-bold">🤖 AI-Powered Insights</h3>
        <p className="text-red-700 mt-2">Get price predictions based on market trends.</p>
      </div>
    </section>
  );
}
