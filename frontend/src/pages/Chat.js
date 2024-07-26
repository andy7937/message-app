// src/components/Chat.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
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

const Chat = () => {
  const { currentUsername, friendUsername } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const dummy = useRef();

  const fetchChatData = useCallback(async () => {
    try {
      const response = await axios.get(`https://message-app-6e0fca8854dd.herokuapp.com/api/chat/${currentUsername}/${friendUsername}`);
      setMessages(response.data.messages);
      setError('');

    } catch (err) {
      console.error('Error fetching chat data', err);
      setError('Failed to fetch messages');
    }
  }, [currentUsername, friendUsername]);

  useEffect(() => {
    fetchChatData();
    const intervalId = setInterval(fetchChatData, 100);
    return () => clearInterval(intervalId);
  }, [fetchChatData]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://message-app-6e0fca8854dd.herokuapp.com/api/chat/${currentUsername}/${friendUsername}/message`, {
        sender: currentUsername,
        message: newMessage,
      });
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage('');
      setError('');

      setTimeout(() => {
        dummy.current.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    } catch (err) {
      console.error('Error sending message', err);
      setError('Failed to send message');
    }
  };

  return (
    <ChatContainer maxWidth="sm">
      <Typography variant="h4">Chat with {friendUsername}</Typography>
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
        <div ref={dummy}></div>
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

export default Chat;
