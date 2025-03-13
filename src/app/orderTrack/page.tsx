"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 23.8103, // Dhaka, Bangladesh
  lng: 90.4125,
};

export default function MapPage() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [places, setPlaces] = useState<any[]>([]);

  // Fetch nearby places on map load
  const fetchNearbyPlaces = (map: any) => {
    if (window.google && window.google.maps) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        location: map.getCenter(),
        radius: 5000, // Search radius in meters
        types: ["store", "restaurant", "cafe"], // Use 'types' instead of 'type'
      };

      service.nearbySearch(request, (results, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results
        ) {
          setPlaces(results); // Ensure results are valid
        } else {
          console.error("Error fetching nearby places:", status);
          setPlaces([]); // Fallback to empty array if no results
        }
      });
    } else {
      console.error("Google Maps API not loaded");
    }
  };

  useEffect(() => {
    if (window.google) {
      setMapLoaded(true);
    }
  }, []);

  return (
    <div className="w-full flex justify-center">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        onLoad={() => setMapLoaded(true)}
      >
        {mapLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
            onLoad={fetchNearbyPlaces} // Fetch nearby places when the map is loaded
          >
            {places.map((place, index) => (
              <Marker
                key={index}
                position={place.geometry.location}
                title={place.name}
              />
            ))}
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
}
