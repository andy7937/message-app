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
  const { setToken } = useContext(AuthContext);
  const [loggedOut, setLoggedOut] = useState(false);

  // Fetching user data
  const fetchUserData = () => {
    const username = localStorage.getItem('username');
    axios.get(`https://message-app-6e0fca8854dd.herokuapp.com/api/users/${username}`)
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
    axios.get(`https://message-app-6e0fca8854dd.herokuapp.com/api/groupchat/${username}/get`)
      .then(response => {
        setGroupChats(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching group chats', error);
      });
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setLoggedOut(true);
  };

  // Refreshing data every second
  useEffect(() => {
    fetchUserData();
    fetchGroupChats(); // Initial fetch for group chats

    const intervalId = setInterval(() => {
      fetchUserData();
      fetchGroupChats(); // Periodic fetch for group chats
    }, 1000); // 100ms interval

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  if (loggedOut) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (friendusername !== localStorage.getItem('username')) {
      axios.post('https://message-app-6e0fca8854dd.herokuapp.com/api/dashboard/friendrequest', {
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
    }
    else if (friendusername === localStorage.getItem('username')) {
      setOutput('Cannot friend yourself.');
    }
    else{
      setOutput('Please enter a valid username.');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" component="h2" gutterBottom>
            Dashboard
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleLogOut}>
            Log Out
          </Button>
        </Box>
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
