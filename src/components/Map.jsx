import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Popup, CircleMarker, useMap } from "react-leaflet";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../index.css';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import emailjs from "@emailjs/browser";
import { onAuthStateChanged } from "firebase/auth";

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

// Helper component: re-centers the map when userLocation changes
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 14);
    }
  }, [position, map]);
  return null;
}

export const Home = () => {
  return (
    <div className="home_opener">
      <div className="home_text">
        <h1>How water works for you. How you can work for water.</h1>
        <h2>See and stay informed on local water safety conditions, learn the impact of wastewater treatment around your area.</h2>
        <div className="buttons d-flex gap-3 mt-4">
          <a
            className="btn btn-outline-primary"
            onClick={() => document.getElementById("explore").scrollIntoView({ behavior: "smooth" })}
          >
            Learn More <i className="bi bi-arrow-down"></i>
          </a>
          <a className="btn btn-outline-dark" href="/module">
            Your Impact
          </a>
        </div>
      </div>
      <div className="home_image">
        <img src="../img/water_works_cover.png" alt="cover image" />
      </div>
    </div>
  )
};

export const Map = ({ compact = false }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [userDisplayName, setUserDisplayName] = useState("");

  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyStatus, setNotifyStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Listen for logged-in user and fetch their location from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.location) {
            setUserLocation([data.location.latitude, data.location.longitude]);
            setUserDisplayName(data.displayName || "You");
          }
        }
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch CSO map points
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const snapshot = await getDocs(collection(db, "Map"));
        const points = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.Street_name,
            rain: data.Rain,
            cso: data.Cso_possibility,
            position: [data.Location.latitude, data.Location.longitude]
          };
        });
        setLocations(points);
      } catch (error) {
        console.error("Error loading locations:", error);
      }
    };
    fetchLocations();
  }, []);

  const handleNotifySubmit = async (event) => {
    event.preventDefault();

    const email = notifyEmail.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setNotifyStatus({ type: "error", message: "Please enter a valid email address" });
      return;
    }

    const redStreetNames = locations
      .filter((loc) => loc.cso)
      .map((loc) => loc.name);

    const streetNameList = redStreetNames.length
      ? redStreetNames.map((name, i) => `${i + 1}. ${name}`).join("\n")
      : "No CSO risk";

    try {
      setIsSubmitting(true);
      setNotifyStatus({ type: "", message: "" });

      await emailjs.send(
        "service_qlgbbgv",
        "template_ymkfkut",
        { to_email: email, street_name_list: streetNameList },
        { publicKey: "0h71I3QcFavyxYzsE" }
      );

      setNotifyStatus({ type: "success", message: "Subscribed for CSO Updates" });
      setNotifyEmail("");
    } catch (error) {
      console.error("Error of", error);
      setNotifyStatus({ type: "error", message: "Couldn't subscribe, try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={compact ? "map_feature" : "map_feature container"}>
      <div className="your-impact-header your-impact-container">
        <img src="https://img.icons8.com/?size=100&id=Kh9y4bxkctIl&format=png&color=000000" alt="map icon" />
        <h1 className="primary-header"> Water Safety Map.</h1>
        <h1><b>How water works for you.</b></h1>
      </div>

      {!compact && (
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                1. What is an Overflow Event (CSO)?
              </button>
            </h2>
            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">The Greater Seattle Area runs on a <b>combined sewer system (sewage and rain water flow together)</b>. Often during times of heavy rainfall (but can happen at other times), the system will get overwhelmed and the points on the map act as "relief points" (where untreated / partially treated water is overflowed).</div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                2. How can I best stay informed?
              </button>
            </h2>
            <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">CSO events overflow untreated water which can be harmful to your health if you come into contact. To stay informed, <b>click the "Get Notified" button under the CSO map and we'll send you emails when overflow events are occurring</b>.</div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                3. What can I do to help?
              </button>
            </h2>
            <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">The sewage system is negatively impacted by fertilizer runoffs, unsolicited waste going through, and more. To learn more about what you can do to have a positive impact, <b>click on our "Your Impact" tab above</b>!</div>
            </div>
          </div>
        </div>
      )}

      <div className="map_container>">
        <MapContainer
          center={userLocation || [47.6, -122.333]}
          zoom={userLocation ? 8 : 11.5}
          maxBounds={[
            [47.4, -122.5],
            [47.8, -122.2],
          ]}
          maxBoundsViscosity={1.0}
        >
          {/* Auto-recenter when user location loads */}
          {userLocation && <RecenterMap position={userLocation} />}

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

          {/* CSO map points */}
          {locations.map(loc => (
            <CircleMarker
              key={loc.id}
              center={loc.position}
              radius={5}
              color={loc.cso ? "red" : "green"}
              fillOpacity={0.8}
            >
              <Popup>
                <strong>{loc.name}</strong><br />
                Rain: {loc.rain ? "Yes" : "No"}<br />
                CSO Risk: {loc.cso ? "Possible" : "No"}
              </Popup>
            </CircleMarker>
          ))}

          {/* Logged-in user's home location */}
          {userLocation && (
            <CircleMarker
              center={userLocation}
              radius={8}
              color="gold"
              fillColor="gold"
              fillOpacity={1}
              weight={2}
            >
              <Popup>
                <strong>🏠 {userDisplayName}'s Home</strong>
              </Popup>
            </CircleMarker>
          )}

        </MapContainer>
      </div>

      <div className="button-container mb-3">
        <form className='notify-form d-flex gap-2 align-items-center' onSubmit={handleNotifySubmit}>
          <input
            type="email"
            className='form-control'
            placeholder='Enter your email'
            aria-label='Email for CSO updates'
            value={notifyEmail}
            onChange={(e) => setNotifyEmail(e.target.value)}
            disabled={isSubmitting}
            required
            style={{ minWidth: "240px" }}
          />
          <button type='submit' className='btn btn-outline-primary' disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "✉️ Get Notified!"}
          </button>
        </form>

        <button onClick={toggleDarkMode} className={`btn ${isDarkMode ? "btn-dark" : "btn-light"}`}>
          {isDarkMode ? "☀️" : "🌙"}
        </button>

        {notifyStatus.message && (
          <p className={`mb-3 ${notifyStatus.type === "error" ? "text-danger" : "text-success"}`}>
            {notifyStatus.message}
          </p>
        )}
      </div>
    </div>
  );
};
