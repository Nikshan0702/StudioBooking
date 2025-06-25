import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './assets/Home';
import Login from './Clients/Login';
import Register from './Clients/Register';
import PhotoshootBooking from './Booking/PhotoshootBooking';
import About from './assets/About';
import Services from './Booking/Services';
import Profile from './Clients/Profile';

function App() {

  return (
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={< Home/>} />
      <Route path="/login" element={< Login/>} />
      <Route path="/Register" element={< Register/>} />
      <Route path="/PhotoshootBooking/:id" element={< PhotoshootBooking/>} />
      <Route path="/About" element={< About/>} />
      <Route path="/Services" element={< Services/>} />
      <Route path="/Profile" element={< Profile/>} />
      
    </Routes>

</BrowserRouter>
  )
}

export default App
