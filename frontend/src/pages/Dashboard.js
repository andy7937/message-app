import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

// username password email phonenum 

function Dashboard() {
  const [friendusername, setFriendUsername] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here 
    // Send current users username and friend username to the backend
    axios.post('http://localhost:5001/api/users/friendrequest', {
      currentUsername: localStorage.getItem('username'),
      friendUsername: friendusername
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

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="friendusername">Friend Username</label>
          <input
            type="text"
            id="friendusername"
            value={friendusername}
            onChange={(e) => setFriendUsername(e.target.value)}
            required
          />
        </div>
        {/* Error field to show if submit did not work*/}
        <button type="submit">Login</button>
        {output && <p className="output">{output}</p>}
      </form>
    </div>
  );
}

export default Dashboard;
