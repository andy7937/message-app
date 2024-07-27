import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, List, ListItem, TextField, Button, Paper } from '@mui/material';
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

const MessageItem = styled(ListItem)(({ isCurrentUser }) => ({
  display: 'flex',
  justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
  marginBottom: '10px',
}));

const MessageBubble = styled('div')(({ isCurrentUser }) => ({
  backgroundColor: isCurrentUser ? '#0084ff' : '#f5f5f5', 
  color: isCurrentUser ? '#fff' : '#000', 
  borderRadius: '10px',
  padding: '10px',
  maxWidth: '70%',
  wordWrap: 'break-word', 
}));

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
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const dummy = useRef();

  const fetchGroupChatData = useCallback(async () => {
    try {
      const response = await axios.get(`https://message-app-6e0fca8854dd.herokuapp.com/api/groupchat/${groupChatName}/open`);
      setMessages(response.data.messages);
      setError('');

      if (isInitialLoad) {
        dummy.current.scrollIntoView({ behavior: 'smooth' });
        setIsInitialLoad(false);
      }
    } catch (err) {
      console.error('Error fetching chat data', err);
      setError('Failed to fetch messages');
    }
  }, [groupChatName, isInitialLoad]);

  useEffect(() => {
    fetchGroupChatData();
    const intervalId = setInterval(fetchGroupChatData, 500);
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
      <Typography variant="h4">Group Chat in {groupChatName}</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <MessagesContainer>
        <List>
          {messages.map((msg, index) => {
            const isCurrentUser = msg.sender === currentUsername; 
            return (
              <MessageItem key={index} isCurrentUser={isCurrentUser}>
                <MessageBubble isCurrentUser={isCurrentUser}>
                  <strong>{msg.sender}</strong>
                  <Typography>{msg.message}</Typography>
                  <Typography variant="caption">{new Date(msg.timestamp).toLocaleString()}</Typography>
                </MessageBubble>
              </MessageItem>
            );
          })}
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

export default GroupChat;
