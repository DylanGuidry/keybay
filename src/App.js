import React, { useEffect, useState } from 'react';
import Login from './components/login.component';
import HomePage from './components/home/homepage.component';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

function App() {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    joined: ''
  });

  const loadUser = (data) => { // Define loadUser as a constant
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      joined: data.joined
    })
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Login loadUser={loadUser} />} /> {/* Pass loadUser as a prop */}
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
