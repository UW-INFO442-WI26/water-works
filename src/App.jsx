import React from "react";
import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router'
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet"></link>
import { Map, Navbar } from './components/Map.jsx';

function App() {
  return (
    <div>
      <Navbar />
      <Map />
    </div>
  );
}

export default App;