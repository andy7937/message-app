import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../App.css';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

// username password email phonenum 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');
  const [navigate, setNavigate] = useState(false);
  const { setToken } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here 
    // Send data to the backend
    axios.post('http://localhost:5001/api/users/login', {
      username,
      password
    })
    .then(response => {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      console.log(response.data);
      setOutput(response.data.message);
      localStorage.setItem('username', username);
      setNavigate(true);
      
    })
    .catch(error => {
      setToken(null);
      localStorage.removeItem("token");
      if (error.response) {
        // Backend returned an error response
        if (error.response.data && error.response.data.error) {
          setOutput(error.response.data.error);
        } 

      } 
      else if (error.request) {
        // No response from backend
        setOutput('No response from server. Please check your connection.');
      } 

      else {
        // Unexpected error
        setOutput('An error occurred. Please try again.');
      }
      
      console.error('There was an error logging in!', error);
    });
  };

    // Perform navigation when redirect state is true
    if (navigate) {
      return <Navigate to="/dashboard" />;
    }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Error field to show if submit did not work*/}
        <button type="submit">Login</button>
        {output && <p className="output">{output}</p>}
      </form>
    </div>
  );
}

export default Login;
