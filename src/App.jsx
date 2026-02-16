import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import { Map, Home, Footer } from './components/Map.jsx';
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
              <a className='nav-link' href='#about'> About Us </a>
            </li>
            <li className='nav-items'>
               <NavLink to='/map' className='nav-link'>Map</NavLink>
            </li>
            <li className='nav-items'>
              <NavLink to='/module' className='nav-link'>Module</NavLink>
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
      <section id='map-preview' className='container py-5'>
        <Map compact={true}/>
      </section>
      <section id='about' className='container py-5'>
        <About />
      </section>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<Map compact={false}/>} />
          <Route path="/module" element={<Module />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/quiz" element={<Quiz />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
