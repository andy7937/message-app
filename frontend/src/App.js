import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Aboutus from './pages/Aboutus';
import Dashboard from './pages/Dashboard';
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
          </Routes>
      </Router>

      <Footer />
    </>
  );
}

export default App;
