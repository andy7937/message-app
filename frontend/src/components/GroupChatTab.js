import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Paper, Button } from '@mui/material';

const GroupChatTab = ({ groupChats }) => {
  const navigate = useNavigate();


  const handleGroupChatClick = (groupChatName) => {
    navigate(`/groupchat/${groupChatName}/${localStorage.getItem('username')}`);
  };

  const handleDeleteClick = async (event, groupChatName) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this group chat?')) {
      try {
        const response = await axios.delete(`https://message-app-6e0fca8854dd.herokuapp.com/api/groupchat/${groupChatName}/delete`);
      } catch (err) {
        console.error('Error deleting group chat', err);
      }
    }
  };



  return (
    <Paper elevation={3} style={{ padding: '1rem', marginTop: '1rem' }}>
      <Typography variant="h5" component="h3" gutterBottom>
        Group Chats
      </Typography>
      <List>
        {Array.isArray(groupChats) ? (
          groupChats.map((groupChat, index) => (
            <ListItem button key={index} onClick={() => handleGroupChatClick(groupChat.name)} style={{ cursor: 'pointer' }}>
              <ListItemText primary={groupChat.name} secondary={groupChat.participants.join(' | ')} />

              {groupChat.admins.includes(localStorage.getItem('username')) && (
                <Button variant="contained" color="secondary" onClick={(event) => handleDeleteClick(event, groupChat.name)}>
                  Delete
                </Button>
              )}
            </ListItem>
          ))

        ) : (
          <Typography>No group chats available</Typography>
        )}
      </List>
    </Paper>
  );
};

export default GroupChatTab;
