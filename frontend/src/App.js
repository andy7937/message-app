import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat/:currentUsername/:friendUsername" element={<Chat />} />
            <Route path="/groupchat/:groupChatName/:currentUsername" element={<GroupChatInterface />} />
            <Route path="/groupchat" element={<GroupChat />} />
          </Routes>
      </Router>

      <Footer />
    </>
  );
}

export default App;
