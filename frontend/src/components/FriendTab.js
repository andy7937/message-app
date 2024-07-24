// src/components/FriendTab.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Paper, Button } from '@mui/material';

const FriendTab = ({ friends }) => {
  const navigate = useNavigate();
  const currentUsername = localStorage.getItem('username'); // Get the current user's username

  const handleFriendClick = (friendUsername) => {
    navigate(`/chat/${currentUsername}/${friendUsername}`);
  };

  const handleDeleteClick = async (event, currentUsername, username) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to remove this friend?')) {
      axios.post('http://localhost:5001/api/dashboard/removefriend', {
        usernameCur: currentUsername,
        usernameFri: username
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error declining friend request', error);
      });

      axios.delete(`http://localhost:5001/api/chat/${currentUsername}/${username}/delete`)
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '1rem', marginTop: '1rem' }}>
      <Typography variant="h5" component="h3" gutterBottom>
        Current Friends
      </Typography>
      <List>
        {friends.map((username, index) => (
          <ListItem
            button
            key={index}
            onClick={() => handleFriendClick(username)}
            style={{ cursor: 'pointer' }}
          >
            <ListItemText primary={username} />
            <Button
              variant="contained"
              color="secondary"
              onClick={(event) => handleDeleteClick(event, currentUsername, username)}
            >
              Unfriend
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default FriendTab;