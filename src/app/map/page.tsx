

"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};


 
// const center = {
//   lat: 37.7749, // Example: San Francisco
//   lng: -122.4194
// };

// const center = {
//   lat: 23.8103, // BD
//   lng: 90.4125,
// };


// Coordinates for Savar, Bangladesh
// const center = {
//     lat: 23.8107,
//     lng: 90.3053
//   };


const center = {
  lat: -33.8688,  // Sydney
  lng: 151.2093
};

export default function MapPage() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="w-full max-w-[1130px] mt-10 mx-auto  flex justify-center">
      <LoadScript
        googleMapsApiKey="" // No API Key
        libraries={["places"]} // Optional library, like places for more functionality
        onLoad={() => setMapLoaded(true)}
      >
        {mapLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            <Marker position={center} />
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
}
