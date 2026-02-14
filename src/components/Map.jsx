//import { useState } from 'react'

// map points (Jake)
import { useState, useEffect } from 'react'

import { BrowserRouter, Routes, Route, Link } from 'react-router'
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet"></link>
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/index.css';

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
            Your Impact
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
    <div className="home_opener">
      <div className="home_text">
        <h1>Know before you go. Protect the waters that surround you.</h1>
        <h2>See and stay informed on local water safety conditions, learn the impact of wastewater treatment around your area.</h2>
        <div className="buttons d-flex gap-3 mt-4">
          <a className="btn btn-outline-primary" href="#">
            Learn More <i className="bi bi-arrow-down"></i>
          </a>
          <a className="btn btn-outline-dark" href="#">
            Your Impact
          </a>
        </div>
      </div>
      <div className="home_image">
          <img src="../../water_works_cover.png" alt="cover image" />
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
    <div className="map_feature container mt-5 pt-5">
      {/* Theme Toggle Button */}

      <div className="map_context">
        <h1>
          CSO Map
        </h1>
        <h2 className='heading_context'>
          Check recent overflow activity to make safer choices for you and your family.
        </h2>

        <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              1. What is an Overflow Event (CSO)?
            </button>
          </h2>
          <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">The Greater Seattle Area runs on a <b>combined sewer system (sewage and rain water flow together)</b>. Often during times of heavy rainfall (but can happen at other times), the system will get overwhelmed and the points on the map act as “relief points” (where untreated / partially treated water is overflowed).</div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
              2. How can I best stay informed?
            </button>
          </h2>
          <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">CSO events overflow untreated water which can be harmful to your health if you come into contact. To stay informed, <b>click the “Get Notified” button under the CSO map and we’ll send you emails when overflow events are occurring</b>.</div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
              3. What can I do to help?
            </button>
          </h2>
          <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">The sewage system is negatively impacted by fertilizer runoffs, unsolicited waste going through, and more. To learn more about what you can do to have a positive impact, <b>click on our “Your Impact” tab above</b>!</div>
          </div>
        </div>
      </div>

      </div>

      <div className="map_container>">
      {/* Map Container */}
      <MapContainer
        center={[47.6, -122.333]} // Default center (latitude, longitude)
        zoom={11.5} // Default zoom level'
        maxBounds={[
          [47.4, -122.5], // Southwest corner of the bounding box
          [47.8, -122.2], // Northeast corner of the bounding box
        ]}
        maxBoundsViscosity={1.0} // Prevents panning outside the bounds
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
          <CircleMarker
            key={loc.id}
            center={loc.position} // Use `center` instead of `position`
            radius={5} // Adjust the size of the point
            color={loc.cso ? "red" : "green"} // RED if CSO true, GREEN if false
            fillOpacity={0.8} // Adjust the opacity of the point
          >
            <Popup>
              <strong>{loc.name}</strong><br />
              Rain: {loc.rain ? "Yes" : "No"}<br />
              CSO Risk: {loc.cso ? "Possible" : "No"}
            </Popup>
          </CircleMarker>
        ))}

      </MapContainer>
      </div>
      <div className="button-container d-flex justify-content-end mb-3">
      <button
        className="btn btn-primary"
        onClick={() => alert("You will be notified of updates!")}
      >
        ✉️ Get Notified!
      </button>
        <button
          onClick={toggleDarkMode}
          className={`btn ${isDarkMode ? "btn-dark" : "btn-light"}`}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
};

export const Footer = () => {

  return (
    <div className = "footer">
      <h1>
        Contact Us
      </h1>
    </div>
  );
};