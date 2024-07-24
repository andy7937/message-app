// src/components/FriendRequestTab.js
import React from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, ButtonGroup } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const FriendRequestTab = ({ pendingRequests, setPendingRequests }) => {
  const handleAccept = (friendUsername) => {
    const username = localStorage.getItem('username');
    axios.post('https://message-app-6e0fca8854dd.herokuapp.com/api/dashboard/acceptfriendrequest', {
      usernameCur: username,
      usernameFri: friendUsername
    })
    .then(response => {
      setPendingRequests(pendingRequests.filter(username => username !== friendUsername));
    })
    .catch(error => {
      console.error('Error accepting friend request', error);
    });
  };

  const handleDecline = (friendUsername) => {
    const username = localStorage.getItem('username');
    axios.post('https://message-app-6e0fca8854dd.herokuapp.com/api/dashboard/declinefriendrequest', {
      usernameCur: username,
      usernameFri: friendUsername
    })
    .then(response => {
      setPendingRequests(pendingRequests.filter(username => username !== friendUsername));
    })
    .catch(error => {
      console.error('Error declining friend request', error);
    });
  };

  return (
    <Paper elevation={3} style={{ padding: '1rem', marginTop: '1rem' }}>
      <Typography variant="h5" component="h3" gutterBottom>
        Pending Friend Requests
      </Typography>
      <List>
        {pendingRequests.map((username, index) => (
          <ListItem key={index}>
            <ListItemText primary={username} />
            <ListItemSecondaryAction>
              <ButtonGroup>
                <IconButton edge="end" aria-label="accept" onClick={() => handleAccept(username)}>
                  <CheckIcon />
                </IconButton>
                <IconButton edge="end" aria-label="decline" onClick={() => handleDecline(username)}>
                  <CloseIcon />
                </IconButton>
              </ButtonGroup>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default FriendRequestTab;
