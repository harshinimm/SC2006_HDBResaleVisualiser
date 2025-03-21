import React from "react";
import MapComponent from "../utils/MapComponent"; // Import Google Maps component

function GoogleMapPage() {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold">HDB Resale Price - Interactive Map</h1>
      <MapComponent />
    </div>
  );
}

export default GoogleMapPage;
