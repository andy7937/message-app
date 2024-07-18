// src/components/FriendRequestTab.js
import React from 'react';

const FriendTab = ({ friends }) => {

  return (
    <div>
      <h3>Current Friends</h3>
      <ul>
        {friends.map((username, index) => (
          <li key={index}>{username}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendTab;
