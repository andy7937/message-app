import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemText, Paper, Button, TextField } from '@mui/material';
import axios from 'axios';

const GroupChat = ({ friends }) => {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [groupName, setGroupName] = useState('');
  const currentUsername = localStorage.getItem('username');

  const handleFriendClick = (friendUsername) => {
    setSelectedFriends((prevSelectedFriends) =>
      prevSelectedFriends.includes(friendUsername)
        ? prevSelectedFriends.filter((username) => username !== friendUsername)
        : [...prevSelectedFriends, friendUsername]
    );
  };

  const handleSubmit = async () => {
    if (!groupName.trim()) {
      alert('Please enter a group chat name.');
      return;
    }

    try {
      const users = [currentUsername, ...selectedFriends];
      const response = await axios.post('http://localhost:5001/api/groupchat/creategroupchat', {
        users,
        name: groupName,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error creating group chat', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '1rem', marginTop: '1rem' }}>
      <Typography variant="h5" component="h3" gutterBottom>
        Create Group Chat
      </Typography>
      <TextField
        label="Group Chat Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        fullWidth
        style={{ marginBottom: '1rem' }}
      />
      <Typography variant="h6" component="h4">
        Add Friends to Group Chat
      </Typography>
      <List>
        {friends.map((username, index) => (
          <ListItem
            button
            key={index}
            onClick={() => handleFriendClick(username)}
            selected={selectedFriends.includes(username)}
            style={{ cursor: 'pointer' }}
          >
            <ListItemText primary={username} />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={selectedFriends.length === 0}
        style={{ marginTop: '1rem' }}
      >
        Create Group Chat
      </Button>
    </Paper>
  );
};

export default GroupChat;