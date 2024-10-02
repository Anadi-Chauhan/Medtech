"use client"

import { useEffect, useState } from 'react';

// Haversine formula to calculate distance between two coordinates
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Emergency = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationAndHospitals = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });

            try {
              const query = `
                [out:json];
                (
                  node["amenity"="hospital"](around:5000, ${latitude}, ${longitude});
                );
                out body;
              `;
              const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
              const data = await response.json();

              // Calculate distances and sort by proximity
              const hospitalsWithDistance = data.elements
                .filter(hospital => hospital.lat && hospital.lon) // Ensure lat/lon exist
                .map(hospital => ({
                  ...hospital,
                  distance: haversineDistance(latitude, longitude, hospital.lat, hospital.lon)
                }))
                .sort((a, b) => a.distance - b.distance) // Sort by distance
                .slice(0, 10); // Get the 3 nearest hospitals

              setHospitals(hospitalsWithDistance);
            } catch (error) {
              setError("Failed to fetch hospitals.");
            } finally {
              setLoading(false);
            }
          },
          (err) => {
            setError(err.message);
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    };

    fetchLocationAndHospitals();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Nearby Government Hospitals</h1>
      {error && <p className="text-red-500">{error}</p>}
      {!location && !error && <p>Fetching location...</p>}
      {location && hospitals.length === 0 && !error && <p>No nearby hospitals found.</p>}
      {location && hospitals.length > 0 && (
        <ul>
          {hospitals.map((hospital) => (
            <li key={hospital.id} className="mb-2 border p-2 rounded">
              <p><strong>Name:</strong> {hospital.tags.name || "N/A"}</p>
              <p><strong>Address:</strong> {hospital.tags["addr:street"] || hospital.tags["addr:full"] || "N/A"}</p>
              <p><strong>Phone:</strong> {hospital.tags["contact:phone"] || "N/A"}</p>
              <p><strong>Distance:</strong> {hospital.distance.toFixed(2)} km</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Emergency;
