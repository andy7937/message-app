// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phonenum, setPhonenum] = useState('');
  const [output, setOutput] = useState({ message: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setOutput({ message: 'Passwords do not match', type: 'error' });
      return;
    } 

    if (!username || !password || !email || !phonenum) {
      setOutput({ message: 'Please fill out all fields', type: 'error' });
      return;
    }
    
    // Handle registration logic here 
    // Send data to the backend
    axios.post('https://message-app-6e0fca8854dd.herokuapp.com/api/users/register', {
      username,
      password,
      email,
      phonenum,
    })
    .then(response => {
      console.log(response.data);
      setOutput({ message: 'Registration successful', type: 'success' });
    })
    .catch(error => {
      if (error.response) {
        // Backend returned an error response
        if (error.response.data && error.response.data.error) {
          setOutput({ message: error.response.data.error, type: 'error' });
        } 
      } 
      else if (error.request) {
        // No response from backend
        setOutput({ message: 'No response from server. Please check your connection.', type: 'error' });
      } 
      else {
        // Unexpected error
        setOutput({ message: 'An error occurred. Please try again.', type: 'error' });
      }
      console.error('There was an error registering!', error);
    });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phonenum"
            label="Phone Number"
            type="phonenum"
            id="phonenum"
            autoComplete="phonenum"
            value={phonenum}
            onChange={(e) => setPhonenum(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          {output.message && (
            <Alert severity={output.type} sx={{ mt: 2 }}>
              {output.message}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
