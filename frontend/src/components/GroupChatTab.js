import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const GroupChatTab = ({ groupChats }) => {
  const navigate = useNavigate();

  const handleGroupChatClick = (groupChatName) => {
    navigate(`/groupchat/${groupChatName}/open`);
  };

  return (
    <Paper elevation={3} style={{ padding: '1rem', marginTop: '1rem' }}>
      <Typography variant="h5" component="h3" gutterBottom>
        Group Chats
      </Typography>
      <List>
        {Array.isArray(groupChats) && groupChats.length > 0 ? (
          groupChats.map((groupChat, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleGroupChatClick(groupChat.name)}
              style={{ cursor: 'pointer' }}
            >
              <ListItemText primary={groupChat.name} />
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
