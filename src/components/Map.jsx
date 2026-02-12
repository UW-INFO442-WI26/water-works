//import { useState } from 'react'

// map points (Jake)
import { useState, useEffect } from 'react'

import { BrowserRouter, Routes, Route, Link } from 'react-router'
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet"></link>
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/home.css';

// ADD FIREBASE IMPORTS (Jake)
import { collection, getDocs } from "firebase/firestore";   //  Firestore functions
import { db } from "../firebase";                            //  your firebase config file
import L from "leaflet"; //  needed to create custom marker icons
import "leaflet/dist/leaflet.css"; //  ensures markers render correctly

//  Custom marker icons based on CSO risk
const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Water Works
        </a>
        <div className="d-flex gap-4 ms-auto">
          <a className="nav-link text-white" href="#">
            Home
          </a>
          <a className="nav-link text-white" href="#">
            Quiz
          </a>
          <a className="nav-link text-white" href="#">
            About
          </a>
        </div>

        <span className="text-white mx-3">|</span>

        <div className="d-flex gap-3">
          <a className="btn btn-outline-light" href="#">
            Sign-Up
          </a>
          <a className="btn btn-outline-light" href="#">
            Log-In
          </a>
        </div>
      </div>
    </nav>
  );
};

export const Home = () => {
  return (
    <div style={{ marginTop: "80px", padding: "20px"}}>
      <h1>Know before you go. Protect the waters you're surrounded by.</h1>
      <h2>See and stay informed on local water safety conditions, learn the impact of wastewater treatment around your area.</h2>
      <div className="d-flex gap-3 mt-4">
        <a className="btn btn-outline-dark" href="#">
          Learn More
        </a>
        <a className="btn btn-outline-dark" href="#">
          Your Impact
        </a>
      </div>
    </div>
  )
};

export const Map = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // map points (Jake)
  const [locations, setLocations] = useState([]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Map points (Jake)
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        //  "Map" must match your Firestore collection name EXACTLY
        const snapshot = await getDocs(collection(db, "Map"));

        const points = snapshot.docs.map(doc => {
          const data = doc.data();

          return {
            id: doc.id,
            name: data.Street_name,            // field from Firestore
            rain: data.Rain,                   // field from Firestore
            cso: data.Cso_possibility,         // field from Firestore

            // CONVERT FIRESTORE GEPOINT → LEAFLET [lat, lng]
            position: [
              data.Location.latitude,
              data.Location.longitude
            ]
          };
        });

        setLocations(points); // Save to state so React re-renders markers
      } catch (error) {
        console.error("Error loading locations:", error);
      }
    };

    fetchLocations();
  }, []); // empty dependency = run once on load

  //end map points (Jake)


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
        center={[47.6, -122.333]} // Default center (latitude, longitude)
        zoom={11.5} // Default zoom level
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

        {locations.map(loc => (
          <Marker
            key={loc.id}
            position={loc.position}
            icon={loc.cso ? redIcon : greenIcon} // RED if CSO true, GREEN if false
          >
            <Popup>
              <strong>{loc.name}</strong><br />
              Rain: {loc.rain ? "Yes" : "No"}<br />
              CSO Risk: {loc.cso ? "Possible" : "No"}
            </Popup>
          </Marker>
        ))}


      </MapContainer>
    </div>
  );
};