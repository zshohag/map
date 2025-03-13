// "use client";

// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import { useState } from "react";

// const containerStyle = {
//   width: "100%",
//   height: "400px"
// };

// // Coordinates for Dhaka, Bangladesh
// const center = {
//   lat: 23.8103,
//   lng: 90.4125
// };

// export default function MapPage() {
//   const [mapLoaded, setMapLoaded] = useState(false);

//   return (
//     <div className="w-full flex justify-center">
//       <LoadScript
//         googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
//         onLoad={() => setMapLoaded(true)}
//       >
//         {mapLoaded && (
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={center}
//             zoom={10} // Adjust zoom level for Bangladesh
//           >
//             <Marker position={center} />
//           </GoogleMap>
//         )}
//       </LoadScript>
//     </div>
//   );
// }


"use client";

import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { useState, useRef } from "react";

const containerStyle = {
  width: "100%",
  height: "400px"
};

// Coordinates for Dhaka, Bangladesh
const center = {
  lat: 23.8103,
  lng: 90.4125
};

// Starting and destination points
const origin = {
  lat: 23.8103,
  lng: 90.4125
};

const destination = {
  lat: 23.8700,
  lng: 90.3920
};

export default function MapPage() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [directions, setDirections] = useState<any>(null);

  // DirectionsService reference
  const directionsServiceRef = useRef<any>(null);

  const calculateRoute = () => {
    if (directionsServiceRef.current) {
      directionsServiceRef.current.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING, // You can also use WALKING, BICYCLING, or TRANSIT
        },
        (result: any, status: any) => {
          if (status === "OK") {
            setDirections(result);
          } else {
            console.error("Error calculating directions:", status);
          }
        }
      );
    }
  };

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
            zoom={12} // Adjust zoom level for Bangladesh
          >
            {/* Marker for origin */}
            <Marker position={origin} />

            {/* Marker for destination */}
            <Marker position={destination} />

            {/* Directions Renderer */}
            {directions && <DirectionsRenderer directions={directions} />}

            {/* Calculate Route Button */}
            <button
              onClick={calculateRoute}
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                padding: "10px",
                background: "white",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
              }}
            >
              Get Directions
            </button>
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
}


















// "use client";

// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import { useState } from "react";

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// // Coordinates for Dhaka, Bangladesh
// const center = {
//   lat: 23.8103,
//   lng: 90.4125,
// };

// export default function MapPage() {
//   const [mapLoaded, setMapLoaded] = useState(false);

//   // Additional map options to enhance the details
//   const mapOptions = {
//     zoomControl: true,
//     mapTypeControl: true,
//     streetViewControl: true,
//     fullscreenControl: true,
//     styles: [
//       {
//         elementType: "geometry",
//         stylers: [
//           {
//             color: "#212121",
//           },
//         ],
//       },
//       {
//         elementType: "labels.icon",
//         stylers: [
//           {
//             visibility: "off",
//           },
//         ],
//       },
//       {
//         elementType: "labels.text.fill",
//         stylers: [
//           {
//             color: "#757575",
//           },
//         ],
//       },
//       {
//         elementType: "labels.text.stroke",
//         stylers: [
//           {
//             color: "#212121",
//           },
//         ],
//       },
//       {
//         featureType: "administrative",
//         elementType: "geometry",
//         stylers: [
//           {
//             color: "#757575",
//           },
//         ],
//       },
//       {
//         featureType: "administrative.country",
//         elementType: "labels.text.fill",
//         stylers: [
//           {
//             color: "#9e9e9e",
//           },
//         ],
//       },
//       {
//         featureType: "administrative.province",
//         elementType: "labels.text.fill",
//         stylers: [
//           {
//             color: "#9e9e9e",
//           },
//         ],
//       },
//       {
//         featureType: "landscape.man_made",
//         elementType: "geometry",
//         stylers: [
//           {
//             color: "#334e6b",
//           },
//         ],
//       },
//       {
//         featureType: "landscape.natural",
//         elementType: "geometry",
//         stylers: [
//           {
//             color: "#212121",
//           },
//         ],
//       },
//     ], // Optional: add a custom style for the map (in this case, dark mode)
//   };

//   return (
//     <div className="w-full flex justify-center">
//       <LoadScript
//         googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
//         onLoad={() => setMapLoaded(true)}
//       >
//         {mapLoaded && (
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={center}
//             zoom={12} // Adjust zoom level for more detailed view
//             options={mapOptions} // Pass additional options for enhanced controls
//           >
//             <Marker position={center} />
//           </GoogleMap>
//         )}
//       </LoadScript>
//     </div>
//   );
// }
