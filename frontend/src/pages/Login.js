import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

// username password email phonenum 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');

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
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.error) {
        setOutput(error.response.data.error);
      } 
      console.error('There was an error logging in!', error);
    });
  };

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
