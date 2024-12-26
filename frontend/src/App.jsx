// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Card from './ components/Card.jsx';
import Otp from './ components/Otp.jsx';
import Info from './ components/Info.jsx';
import Email from './ components/Email.jsx';
import Success from './ components/Success.jsx';
import Home from './ components/Home.jsx';
import AdminPanel from './AdminPanel.jsx';



const App = () => {
  const token = localStorage.getItem('token'); // Retrieve JWT token

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/card" element={<Card />} />
        <Route path="/info" element={<Info />} />
        <Route path="/email" element={<Email />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/redirections" element={<AdminPanel token={token} />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
