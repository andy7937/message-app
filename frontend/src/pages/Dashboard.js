// src/components/Dashboard.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import FriendRequestTab from '../components/FriendRequestTab'; 
import FriendTab from '../components/FriendTab'; 
import GroupChat from '../components/GroupChat'; 
import GroupChatTab from '../components/GroupChatTab';
import { AuthContext } from '../components/AuthContext';
import { Navigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Paper, Alert } from '@mui/material';

function Dashboard() {
  const [friendusername, setFriendUsername] = useState('');
  const [output, setOutput] = useState('');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [groupChats, setGroupChats] = useState([]); // State for group chats
  const { token, loading } = useContext(AuthContext);

  // Fetching user data
  const fetchUserData = () => {
    const username = localStorage.getItem('username');
    axios.get(`http://localhost:5001/api/users/${username}`)
      .then(response => {
        setPendingRequests(response.data.friendsPending);
        setFriends(response.data.friends);
      })
      .catch(error => {
        console.error('Error fetching user data', error);
      });
  };

  // Fetching group chats
  const fetchGroupChats = () => {
    const username = localStorage.getItem('username');
    axios.get(`http://localhost:5001/api/groupchat/${username}/get`)
      .then(response => {
        setGroupChats(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching group chats', error);
      });
  };

  // Refreshing data every second
  useEffect(() => {
    fetchUserData();
    fetchGroupChats(); // Initial fetch for group chats

    const intervalId = setInterval(() => {
      fetchUserData();
      fetchGroupChats(); // Periodic fetch for group chats
    }, 1000); // 1000ms interval

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  if (loading) {
    return null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5001/api/dashboard/friendrequest', {
      usernameFri: friendusername,
      usernameCur: localStorage.getItem('username')
    })
    .then(response => {
      setOutput(response.data.message);
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.error) {
        setOutput(error.response.data.error);
      } else if (error.request) {
        setOutput('No response from server. Please check your connection.');
      } else {
        setOutput('An error occurred. Please try again.');
      }
    });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Dashboard
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            id="friendusername"
            label="Friend's Username"
            value={friendusername}
            onChange={(e) => setFriendUsername(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Add Friend
          </Button>
        </Box>
        {output && <Alert severity="info" sx={{ marginTop: 2 }}>{output}</Alert>}

        <FriendRequestTab pendingRequests={pendingRequests} setPendingRequests={setPendingRequests} />
        <FriendTab friends={friends} />
        <GroupChatTab groupChats={groupChats} /> 
        <GroupChat friends={friends} /> 

      </Paper>
    </Container>
  );
}

export default Dashboard;
