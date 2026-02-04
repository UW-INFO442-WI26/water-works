import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router'
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet"></link>
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Water Works
        </a>
      </div>
    </nav>
  );
};

export const Map = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="container mt-5 pt-5">
      {/* Theme Toggle Button */}
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={toggleDarkMode}
          className={`btn ${isDarkMode ? "btn-dark" : "btn-light"}`}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Map Container */}
      <MapContainer
        center={[51.505, -0.09]} // Default center (latitude, longitude)
        zoom={13} // Default zoom level
        style={{ height: "70vh", width: "100%" }}
      >
        {isDarkMode ? (
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          />
        ) : (
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          />
        )}

        <Marker position={[51.505, -0.09]}>
          <Popup>
            A sample popup. <br /> You can customize this.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};