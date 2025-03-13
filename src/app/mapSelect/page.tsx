"use client";
import React, { useState } from "react";
import { GoogleMap, MarkerF, InfoWindowF, LoadScript } from "@react-google-maps/api";
import { Button } from "@/components/ui/button"; // Assuming this is a custom or ShadCN UI button
import { Input } from "@/components/ui/input"; // Assuming this is a custom or ShadCN UI input

interface Place {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

const containerStyle = {
  width: "80%",
  height: "600px",
  margin: "auto", 
  borderRadius: "8px", // Add rounded corners
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Add shadow to map container
};

const defaultPosition = { lat: 40.7128, lng: -74.006 }; // Default position (New York City)

export default function DashboardPage() {
  const [places, setPlaces] = useState<Place[]>([
    {
      name: "Burger City",
      address: "999 Some Street, New York City, NY",
      latitude: 40.7121,
      longitude: -74.005,
    },
    {
      name: "Another Burger",
      address: "243 Some Street, New York City, NY",
      latitude: 40.7131,
      longitude: -74.015,
    },
    {
      name: "Burger Awesome",
      address: "143 Some Street, New York City, NY",
      latitude: 40.7031,
      longitude: -74.035,
    },
    {
      name: "Tasty Burgers",
      address: "521 Oak Street, Brooklyn, NY",
      latitude: 40.6782,
      longitude: -73.9442,
    },
    {
      name: "The Burger Spot",
      address: "56 Elm Avenue, Queens, NY",
      latitude: 40.7551,
      longitude: -73.8466,
    },
    {
      name: "Classic Burger",
      address: "875 Pine Road, Bronx, NY",
      latitude: 40.8448,
      longitude: -73.8648,
    },
    {
      name: "Burgertown Diner",
      address: "145 Maple Lane, Staten Island, NY",
      latitude: 40.5795,
      longitude: -74.1502,
    },
    {
      name: "Big Bite Burgers",
      address: "308 Beach Blvd, Long Island, NY",
      latitude: 40.7893,
      longitude: -73.1294,
    },
    {
      name: "The Burger Haven",
      address: "400 River Street, Manhattan, NY",
      latitude: 40.7425,
      longitude: -73.9949,
    },
    {
      name: "Grill & Burger",
      address: "213 West End Ave, Manhattan, NY",
      latitude: 40.7736,
      longitude: -73.9806,
    },
    {
      name: "Delicious Burgers",
      address: "320 Broadway Street, Manhattan, NY",
      latitude: 40.7612,
      longitude: -73.9776,
    },
    {
      name: "Burger Paradise",
      address: "922 7th Avenue, Manhattan, NY",
      latitude: 40.758,
      longitude: -73.9855,
    },
    {
      name: "Burgers & Fries",
      address: "2500 8th Street, Brooklyn, NY",
      latitude: 40.6895,
      longitude: -73.9875,
    },
    {
      name: "Buns & Patties",
      address: "781 Lexington Avenue, Manhattan, NY",
      latitude: 40.7654,
      longitude: -73.9743,
    },
  ]);

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mapCenter, setMapCenter] = useState(defaultPosition); // Center the map on the search results

  // Geocoding API to get coordinates from an address
  const handleSearch = async () => {
    if (!searchQuery) return; // If search query is empty, do nothing

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const { lat, lng } = results[0].geometry.location;
        setMapCenter({ lat: lat(), lng: lng() }); // Set the map center to the geocoded location
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  // Handle search query change with proper type for 'e' (event)
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyB7PNf6kcCVp7s8DKz_0npkw9rD7AdkxWg">
      <div className="map-container" style={{ marginBottom: "20px" }}>
        {/* Search Bar Section */}
        <div className="flex justify-center m-4">
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange} // Use typed function for handling search query change
            placeholder="Enter address to search"
            style={{
              width: "300px",
              padding: "12px 15px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Slight shadow for input field
              marginRight: "10px",
              transition: "all 0.3s ease-in-out",
            }}
          />
          <Button
            onClick={handleSearch}
            style={{
              padding: "12px 25px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#45a049"; // Darker shade on hover
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#4CAF50"; // Original color
            }}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Render Google Map */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter} // Center the map on the updated location
        zoom={13}
      >
        {places.map((place) => (
          <MarkerF
            key={`${place.address}-${place.name}-${place.latitude}-${place.longitude}`} // Unique key
            position={{ lat: place.latitude, lng: place.longitude }} // Marker position
            onClick={() => setSelectedPlace(place)} // Set selected place on marker click
          />
        ))}
        {selectedPlace && (
          <InfoWindowF
            position={{
              lat: selectedPlace.latitude,
              lng: selectedPlace.longitude,
            }}
            onCloseClick={() => setSelectedPlace(null)} // Close InfoWindow when clicked
          >
            <div style={{ padding: "10px", fontFamily: "Arial, sans-serif" }}>
              <h3 style={{ margin: "0 0 10px", color: "#333" }}>{selectedPlace.name}</h3>
              <p style={{ margin: "0", color: "#555" }}>{selectedPlace.address}</p>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </LoadScript>
  );
}
