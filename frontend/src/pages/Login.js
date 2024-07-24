// src/components/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

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
    axios.post('https://message-app-6e0fca8854dd.herokuapp.com/api/users/login', {
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
          Login
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          {output && <Alert severity="error">{output}</Alert>}
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
