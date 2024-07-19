import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../App.css';
import FriendRequestTab from '../components/FriendRequestTab'; 
import FriendTab from '../components/FriendTab'; 
import { AuthContext } from '../components/AuthContext';
import { Navigate } from 'react-router-dom';


// username password email phonenum 

function Dashboard() {

  const [friendusername, setFriendUsername] = useState('');
  const [output, setOutput] = useState('');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const { token, loading } = useContext(AuthContext);

  useEffect(() => {
    const username = localStorage.getItem('username');
    axios.get(`http://localhost:5001/api/users/${username}`)
      .then(response => {
        setPendingRequests(response.data.friendsPending);
        setFriends(response.data.friends);
      })
      .catch(error => {
        console.error('Error fetching user data', error);
      });
  }, []);


  if (loading) {
    return null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }


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

       
      <FriendRequestTab pendingRequests={pendingRequests} setPendingRequests={setPendingRequests} />

      <FriendTab friends={friends} />



    </div>
  );
}

export default Dashboard;
