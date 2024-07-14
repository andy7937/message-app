import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

// username password email phonenum 

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phonenum, setPhonenum] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      // Handle registration logic here 
      // Send data to the backend
      axios.post('http://localhost:5000/api/users/register', {
        username,
        password,
        email,
        phonenum,
      })
      .then(response => {
        console.log(response.data);
        setError('');
      })
      .catch(error => {
        console.error('There was an error registering!', error);
      });
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
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

        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phonenum">Phone Number</label>
          <input
            type="phonenum"
            id="phonenum"
            value={phonenum}
            onChange={(e) => setPhonenum(e.target.value)}
            required
          />
        </div>
        {/* Error field to show if submit did not work*/}
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
