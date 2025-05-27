import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const [pins, setPins] = useState([]);
  const [newPin, setNewPin] = useState({
    latitude: "",
    longitude: "",
    description: "",
    date: "",
  });
  const [error, setError] = useState("");
  const apiBaseUrl = "http://127.0.0.1:3000"; // Replace with API Gateway URL for production

  const fetchPins = async () => {
    try {
      const response = await API.get('JARioAPI','/map/list');
      setPins(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch pins");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { latitude, longitude, description, date } = newPin;

    if (!latitude || !longitude || !description || !date) {
      setError("All fields are required");
      return;
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    if (
      isNaN(lat) ||
      isNaN(lon) ||
      lat < -90 ||
      lat > 90 ||
      lon < -180 ||
      lon > 180
    ) {
      setError(
        "Invalid coordinates: Latitude [-90, 90], Longitude [-180, 180]"
      );
      return;
    }

    try {
      await API.post('JARioAPI','/map/create', {
        latitude: lat,
        longitude: lon,
        description,
        date,
      });
      setNewPin({ latitude: "", longitude: "", description: "", date: "" });
      setError("");
      fetchPins();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save pin");
    }
  };

  useEffect(() => {
    fetchPins();
  }, []);

  return (
    <div className="p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-black">JAR.io Map</h1>
        <p className="text-dusky mt-2">Pin our special places</p>
      </header>
      <main className="max-w-4xl mx-auto">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
            {error}
          </div>
        )}
        <div className="mb-8">
          <MapContainer
            center={[28.7041, 77.1025]}
            zoom={10}
            className="rounded-lg shadow-md"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {pins.map((pin) => (
              <Marker key={pin.SK} position={[pin.latitude, pin.longitude]}>
                <Popup>
                  <strong>{pin.description}</strong>
                  <br />
                  {pin.date}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-dusky mb-2" htmlFor="latitude">
                Latitude
              </label>
              <input
                id="latitude"
                type="number"
                step="any"
                className="w-full p-2 border border-dusky rounded text-dusky"
                placeholder="e.g., 28.7041"
                value={newPin.latitude}
                onChange={(e) =>
                  setNewPin({ ...newPin, latitude: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-dusky mb-2" htmlFor="longitude">
                Longitude
              </label>
              <input
                id="longitude"
                type="number"
                step="any"
                className="w-full p-2 border border-dusky rounded text-dusky"
                placeholder="e.g., 77.1025"
                value={newPin.longitude}
                onChange={(e) =>
                  setNewPin({ ...newPin, longitude: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-dusky mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="w-full p-2 border border-dusky rounded text-dusky"
              rows="4"
              placeholder="e.g., First date at India Gate"
              value={newPin.description}
              onChange={(e) =>
                setNewPin({ ...newPin, description: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-dusky mb-2" htmlFor="date">
              Date
            </label>
            <input
              id="date"
              type="date"
              className="w-full p-2 border border-dusky rounded text-dusky"
              value={newPin.date}
              onChange={(e) => setNewPin({ ...newPin, date: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="bg-dusky text-white px-6 py-2 rounded hover:bg-black transition"
          >
            Add Pin
          </button>
        </form>
      </main>
    </div>
  );
};

export default Map;
