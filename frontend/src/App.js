// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Aboutus from './pages/Aboutus';
import Dashboard from './pages/Dashboard';
import GroupChat from './components/GroupChat';
import GroupChatInterface from './pages/GroupChat.js';
import Chat from './pages/Chat';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/chat/:currentUsername/:friendUsername" element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="/groupchat/:groupChatName/:currentUsername" element={<PrivateRoute><GroupChatInterface /></PrivateRoute>} />
          <Route path="/groupchat" element={<PrivateRoute><GroupChat /></PrivateRoute>} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
