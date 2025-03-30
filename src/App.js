import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Existing components
import HomePage from "./homepage/HomePage";
import ForgotPassword from "./login/ForgotPassword";
import Signup from "./login/Signup";

// New components you want to add
import MapSelection from "./pages/MapSelection"; // ✅ New Selection Screen
import GoogleMapPage from "./pages/GoogleMapPage"; // ✅ New Google Map Page
import HDBResaleVisualizer from "./pages/HDBResaleVisualizer"; // ✅ Add HDB Resale Visualizer

// Functionality remains the same as the original
function App() {
  return (
    <Router>
      <Routes>
        {/* Existing Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />

        {/* Your New Routes Added Below */}
        <Route path="/map-selection" element={<MapSelection />} /> {/* ✅ New Selection Page */}
        <Route path="/map" element={<GoogleMapPage />} /> {/* ✅ New Google Map Page */}
        
        {/* New HDB Resale Visualizer Route */}
        <Route path="/hdb-resale-visualizer" element={<HDBResaleVisualizer />} />
      </Routes>
    </Router>
  );
}

export default App;

