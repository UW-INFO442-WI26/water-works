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
      <nav class="navbar">
          <div class="logo">
              <h1>Water Works</h1>
          </div>
          <div class="menu">
          <img src="https://img.icons8.com/ios-filled/50/ffffff/menu--v1.png" alt="hamburger-menu"/>
          </div>
      </nav>
  
        {/* Side Menu */}
        <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={toggleMenu}>
            &times;
          </button>
        </div>
      </>
    );
  };

export const Map = () => {
    return (
      <MapContainer
        center={[51.505, -0.09]} // Default center (latitude, longitude)
        zoom={13} // Default zoom level
        style={{ height: "100vh", width: "100%" }} // Full-screen map
      >
        {/* TileLayer: The map tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
  
        {/* Marker: A marker on the map */}
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A sample popup. <br /> You can customize this.
          </Popup>
        </Marker>
      </MapContainer>
    );
  };