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
        {Array.isArray(groupChats)? (
          groupChats.map((groupchats, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleGroupChatClick(groupchats.name)}
              style={{ cursor: 'pointer' }}
            >
              <ListItemText primary={groupchats.name} />
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
