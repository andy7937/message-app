import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

// username password email phonenum 

function Dashboard() {
  const [friendusername, setFriendUsername] = useState('');
  const [output, setOutput] = useState('');
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem('username');
    axios.get(`http://localhost:5001/api/users/${username}`)
      .then(response => {
        setPendingRequests(response.data.friendsPending);
      })
      .catch(error => {
        console.error('Error fetching user data', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here 
    // Send current users username and friend username to the backend
    axios.post('http://localhost:5001/api/dashboard/friendrequest', {
      usernameFri: friendusername,
      usernameCur: localStorage.getItem('username')
    })
    .then(response => {
      console.log(response.data);
      setOutput(response.data.message);
    })
    .catch(error => {
      if (error.response) {
        // Backend returned an error response
        if (error.response.data && error.response.data.error) {
          setOutput(error.response.data.error);
        } 

      } 
      else if (error.request) {
        // No response from backend
        setOutput('No response from server. Please check your connection.');
      } 

      else {
        // Unexpected error
        setOutput('An error occurred. Please try again.');
      }
      
      console.error('There was an error logging in!', error);
    });
  };

  const handleAccept = (friendUsername) => {
    axios.post('http://localhost:5001/api/dashboard/acceptfriendrequest', {
      usernameFri: friendUsername,
      usernameCur: localStorage.getItem('username')
    })
    .then(response => {
      setOutput(response.data.message);
      setPendingRequests(pendingRequests.filter(username => username !== friendUsername));
    })
    .catch(error => {
      console.error('Error accepting friend request', error);
    });
  };

  const handleDecline = (friendUsername) => {
    axios.post('http://localhost:5001/api/dashboard/declinefriendrequest', {
      usernameFri: friendUsername,
      usernameCur: localStorage.getItem('username')
    })
    .then(response => {
      setOutput(response.data.message);
      setPendingRequests(pendingRequests.filter(username => username !== friendUsername));
    })
    .catch(error => {
      console.error('Error declining friend request', error);
    });
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="friendusername">Friends Username</label>
          <input
            type="text"
            id="friendusername"
            value={friendusername}
            onChange={(e) => setFriendUsername(e.target.value)}
            required
          />
        </div>
        {/* Error field to show if submit did not work*/}
        <button type="submit">Add Friend</button>
        {output && <p className="output">{output}</p>} 
      </form>

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
}

export default Dashboard;
