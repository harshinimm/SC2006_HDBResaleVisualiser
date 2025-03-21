import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../homepage/Navbar";

const districts = [
  { name: "Jurong East", lat: 1.3331, lng: 103.7420 },
  { name: "Boon Lay", lat: 1.3396, lng: 103.7073 },
  { name: "Bukit Panjang", lat: 1.3770, lng: 103.7621 },
  { name: "Woodlands", lat: 1.4360, lng: 103.7860 },
  { name: "Yishun", lat: 1.4295, lng: 103.8355 },
  { name: "Bishan", lat: 1.3508, lng: 103.8494 },
  { name: "Orchard", lat: 1.3046, lng: 103.8320 },
  { name: "Serangoon", lat: 1.3496, lng: 103.8732 },
  { name: "Paya Lebar", lat: 1.3182, lng: 103.8931 },
  { name: "Tampines", lat: 1.3530, lng: 103.9444 },
  { name: "Bedok", lat: 1.3244, lng: 103.9301 },
  { name: "Pasir Ris", lat: 1.3731, lng: 103.9496 },
  { name: "Chinatown", lat: 1.2842, lng: 103.8443 },
  { name: "HarbourFront", lat: 1.2653, lng: 103.8223 },
  { name: "Caldecott", lat: 1.3392, lng: 103.8392 }
];

const MapComponent = () => {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode");
  const districtParam = searchParams.get("district");
  const districtsParam = searchParams.get("districts")?.split(",") || [];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY`;
    script.async = true;
    script.defer = true;
    script.onload = () => initializeMap();
    document.body.appendChild(script);
  }, []);

  function initializeMap() {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 1.3521, lng: 103.8198 },
      zoom: 11
    });

    districts.forEach(district => {
      const marker = new window.google.maps.Marker({
        position: { lat: district.lat, lng: district.lng },
        map,
        title: district.name,
        icon: { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }
      });

      if (mode === "single-district" && district.name === districtParam) {
        marker.setIcon("http://maps.google.com/mapfiles/ms/icons/blue-dot.png");
      }

      if (mode === "multi-district" && districtsParam.includes(district.name)) {
        marker.setIcon("http://maps.google.com/mapfiles/ms/icons/blue-dot.png");
      }
    });
  }

  return (
    <div className="min-h-screen bg-white text-red-900">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mt-6">HDB Price Comparison</h1>
      <div ref={mapRef} style={{ width: "90%", height: "600px", margin: "auto", borderRadius: "10px" }} />
      <button onClick={() => navigate("/map-selection")} className="mt-6 px-6 py-3 bg-red-600 text-white font-bold rounded-lg">
        ⬅ Back to Selection
      </button>
    </div>
  );
};

export default MapComponent;
