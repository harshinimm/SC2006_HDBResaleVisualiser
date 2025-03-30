import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import HomePage from "./homepage/HomePage";
import ForgotPassword from "./login/ForgotPassword";
import Signup from "./login/Signup";


import MapSelection from "./pages/MapSelection"; // ✅ New Selection Screen
import GoogleMapPage from "./pages/GoogleMapPage"; // ✅ New Google Map Page
import HDBResaleVisualizer from "./pages/HDBResaleVisualizer"; // ✅ Add HDB Resale Visualizer


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />

       
        <Route path="/map-selection" element={<MapSelection />} /> {/* ✅ New Selection Page */}
        <Route path="/map" element={<GoogleMapPage />} /> {/* ✅ New Google Map Page */}
        
       
        <Route path="/hdb-resale-visualizer" element={<HDBResaleVisualizer />} />
      </Routes>
    </Router>
  );
}

export default App;

