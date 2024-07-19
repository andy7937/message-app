// src/components/Chat.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { currentUsername, friendUsername } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch chat data
  const fetchChatData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/chat/${currentUsername}/${friendUsername}`);
      setMessages(response.data.messages);
      setError('');
    } catch (err) {
      console.error('Error fetching chat data', err);
      setError('Failed to fetch messages');
    } finally {
    }
  }, [currentUsername, friendUsername]);

  // Fetch chat data periodically
  useEffect(() => {
    fetchChatData();
    const intervalId = setInterval(fetchChatData, 1000);

    return () => clearInterval(intervalId);
  }, [fetchChatData]);


  // Handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5001/api/chat/${currentUsername}/${friendUsername}`, {
        sender: currentUsername,
        message: newMessage
      });
      setMessages(prevMessages => [...prevMessages, response.data]);
      setNewMessage('');
      setError('');
    } catch (err) {
      console.error('Error sending message', err);
      setError('Failed to send message');
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat between {currentUsername} and {friendUsername}</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.sender}:</strong> {msg.message} <em>{new Date(msg.timestamp).toLocaleString()}</em>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
