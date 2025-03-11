import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./homepage/HomePage";
import ForgotPassword from "./login/ForgotPassword";
import Signup from "./login/Signup";
import MapSelection from "./pages/MapSelection"; // ✅ Import selection screen
import GoogleMapPage from "./pages/GoogleMapPage"; // ✅ Import Google Map Page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/map-selection" element={<MapSelection />} /> {/* ✅ New Selection Page */}
        <Route path="/map" element={<GoogleMapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
