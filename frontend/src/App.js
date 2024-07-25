// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Aboutus from './pages/Aboutus';
import Dashboard from './pages/Dashboard';
import GroupChat from './components/GroupChat';
import GroupChatInterface from './pages/GroupChat.js';
import Chat from './pages/Chat';
import PrivateRoute from './components/PrivateRoute'; 
import { AuthProvider } from './components/AuthContext'; 
import './App.css';

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/chat/:currentUsername/:friendUsername" element={<PrivateRoute element={<Chat />} />} />
          <Route path="/groupchat/:groupChatName/:currentUsername" element={<PrivateRoute element={<GroupChatInterface />} />} />
          <Route path="/groupchat" element={<PrivateRoute element={<GroupChat />} />} />
        </Routes>
      </Router>
      <Footer />
    </AuthProvider>
  );
}

export default App;
