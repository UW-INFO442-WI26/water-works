import './App.css';
import './css/index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import { Map, Home} from './components/Map.jsx';
import About from "./components/About.jsx";
import SignIn from "./components/Signin.jsx";
import Quiz from "./components/Quiz.jsx";
import Module from "./components/Module.jsx";
import { NavLink } from 'react-router';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        <NavLink to="/" className="navbar-brand fw-semibold">
          Water Works
        </NavLink>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#mainNav'
          aria-controls='mainNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='mainNav'>
          <ul className='navbar-nav ms-auto align-items-lg-center gap-lg-2'>
            <li className='nav-items'>
              <NavLink to='/' className='nav-link'>Home</NavLink>
            </li>
            <li className='nav-items'>
              <NavLink to='/about' className='nav-link'>About</NavLink>
            </li>
            <li className='nav-items'>
               <NavLink to='/map' className='nav-link'>Map</NavLink>
            </li>
            <li className='nav-items'>
              <NavLink to='/module' className='nav-link'>Your Impact</NavLink>
            </li>
            <li className='nav-items ms-lg-2'>
              <NavLink to='/signin' className='btn btn-primary px-3'>
                Sign in with Google
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function HomePage() {
  return (
    <>
      <section id="home">
        <Home />
      </section>
      <section className="home-cards">
        <h1><b>Explore</b></h1>
        <h2 className="subtitle">Click to Learn More About Each Feature</h2>
        <div className="home-cards-container">
          <NavLink to="/about" className="card-content">
            <img src="https://img.icons8.com/?size=100&id=dGz3uury9jro&format=png&color=000000" alt="info icon" />
            <h2>About Us</h2>
            <p>Learn more about the Water Works team and our mission!</p>
          </NavLink>

          <NavLink to="/map" className="card-content">
            <img src="https://img.icons8.com/?size=100&id=Kh9y4bxkctIl&format=png&color=000000" alt="map icon" />
            <h2>CSO Map</h2>
            <p>Explore the King County CSO Map, learn more about the local wastewater system, and get notified!</p>
          </NavLink>

          <NavLink to="/module" className="card-content">
            <img src="https://img.icons8.com/?size=100&id=104292&format=png&color=000000" alt="ok hand icon" />
            <h2>Your Impact</h2>
            <p>Learn how you can make a positive impact on our local waters through every day habits!</p>
          </NavLink>
        </div>
      </section>
    </>
  );
}

function Footer() {

  return (
    <div className = "footer">
      <h1>
        Contact Us
      </h1>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<Map compact={false}/>} />
          <Route path="/module" element={<Module />} />
          <Route path='/about' element={<About/>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/quiz" element={<Quiz />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
