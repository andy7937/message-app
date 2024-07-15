import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { Navigate } from 'react-router-dom';

// username password email phonenum 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');
  const [navigate, setNavigate] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here 
    // Send data to the backend
    axios.post('http://localhost:5000/api/users/login', {
      username,
      password
    })
    .then(response => {
      console.log(response.data);
      setOutput(response.data.message);
      setNavigate(true);

    })
    .catch(error => {
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
