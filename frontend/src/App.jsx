import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './assets/Home';
import Login from './Clients/Login';
import Register from './Clients/Register';
import PhotoshootBooking from './Booking/PhotoshootBooking';

function App() {

  return (
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={< Home/>} />
      <Route path="/login" element={< Login/>} />
      <Route path="/Register" element={< Register/>} />
      <Route path="/PhotoshootBooking" element={< PhotoshootBooking/>} />
      
    </Routes>

</BrowserRouter>
  )
}

export default App
