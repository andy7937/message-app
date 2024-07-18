// src/components/FriendRequestTab.js
import React from 'react';
import axios from 'axios';

const FriendRequestTab = ({ pendingRequests, setPendingRequests }) => {
  const handleAccept = (friendUsername) => {
    const username = localStorage.getItem('username');
    axios.post('http://localhost:5001/api/dashboard/acceptFriendRequest', {
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
    axios.post('http://localhost:5001/api/dashboard/declineFriendRequest', {
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
    <div>
      <h3>Pending Friend Requests</h3>
      <ul>
        {pendingRequests.map((username, index) => (
          <li key={index}>
            {username}
            <button onClick={() => handleAccept(username)}>Accept</button>
            <button onClick={() => handleDecline(username)}>Decline</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRequestTab;
