import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, TextField, Button, Paper } from '@mui/material';
import { styled } from '@mui/system';

const ChatContainer = styled(Container)({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  height: '80vh',
  overflow: 'hidden',
});

const MessagesContainer = styled(Paper)({
  flex: 1,
  width: '100%',
  overflowY: 'auto',
  padding: '10px',
  marginBottom: '20px',
});

const MessageItem = styled(ListItem)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginBottom: '10px',
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  padding: '10px',
});

const NewMessageForm = styled('form')({
  display: 'flex',
  gap: '10px',
  width: '100%',
});

const GroupChat = () => {
  const { groupChatName, currentUsername } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');

  const fetchGroupChatData = useCallback(async () => {
    try {
      const response = await axios.get(`https://message-app-6e0fca8854dd.herokuapp.com/api/groupchat/${groupChatName}/open`);
      setMessages(response.data.messages);
      setError('');
    } catch (err) {
      console.error('Error fetching chat data', err);
      setError('Failed to fetch messages');
    }
  }, [groupChatName]);

  useEffect(() => {
    fetchGroupChatData();
    const intervalId = setInterval(fetchGroupChatData, 1000);
    return () => clearInterval(intervalId);
  }, [fetchGroupChatData]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://message-app-6e0fca8854dd.herokuapp.com/api/groupchat/${groupChatName}/message`, {
        sender: currentUsername,
        message: newMessage,
        groupChatName: groupChatName,
      });
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage('');
      setError('');
    } catch (err) {
      console.error('Error sending message', err);
      setError('Failed to send message');
    }
  };

  return (
    <ChatContainer maxWidth="sm">
      <Typography variant="h4">Group Chat in {groupChatName}</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <MessagesContainer>
        <List>
          {messages.map((msg, index) => (
            <MessageItem key={index}>
              <ListItemText
                primary={<strong>{msg.sender}</strong>}
                secondary={
                  <>
                    <Typography>{msg.message}</Typography>
                    <Typography variant="caption">{new Date(msg.timestamp).toLocaleString()}</Typography>
                  </>
                }
              />
            </MessageItem>
          ))}
        </List>
      </MessagesContainer>
      <NewMessageForm onSubmit={handleSendMessage}>
        <TextField
          variant="outlined"
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
          required
        />
        <Button type="submit" variant="contained" color="primary">Send</Button>
      </NewMessageForm>
    </ChatContainer>
  );
};

export default GroupChat;
