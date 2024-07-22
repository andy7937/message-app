// src/components/FriendTab.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const FriendTab = ({ friends }) => {
  const navigate = useNavigate();
  const currentUsername = localStorage.getItem('username'); // Get the current user's username

  const handleFriendClick = (friendUsername) => {
    navigate(`/chat/${currentUsername}/${friendUsername}`);
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
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default FriendTab;
