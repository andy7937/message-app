// src/components/FriendTab.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FriendTab = ({ friends }) => {
  const navigate = useNavigate();
  const currentUsername = localStorage.getItem('username'); // Get the current user's username

  const handleFriendClick = (friendUsername) => {
    navigate(`/chat/${currentUsername}/${friendUsername}`);
  };

  return (
    <div>
      <h3>Current Friends</h3>
      <ul>
        {friends.map((username, index) => (
          <li
            key={index}
            onClick={() => handleFriendClick(username)}
            style={{ cursor: 'pointer', color: 'blue' }}
          >
            {username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendTab;
