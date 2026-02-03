import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router'
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet"></link>
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
      <>
      <nav className="navbar">
          <div className="logo">
              <h1>Water Works</h1>
          </div>
          <div className="menu">
          <img src="https://img.icons8.com/ios-filled/50/ffffff/menu--v1.png" alt="hamburger-menu"/>
          </div>
      </nav>
      </>
    );
  };

  export const Map = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
  
    const toggleDarkMode = () => {
      console.log("Button clicked!"); // Debugging
      setIsDarkMode(!isDarkMode);
    };
  
    return (
      <div>
        <button
          onClick={toggleDarkMode}
          className={`toggle-button ${isDarkMode ? "dark" : ""}`}
        >
          {isDarkMode ? "☀️" : "🌑"}
        </button>
  
        <MapContainer
          center={[51.505, -0.09]} // Default center (latitude, longitude)
          zoom={13} // Default zoom level
          style={{ height: "70vh", width: "100%" }} // Full-screen map
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