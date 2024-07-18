// src/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// friend request
exports.friendRequest = async (req, res) => {
  const { usernameCur, usernameFri } = req.body;

  try {
    // Check if the current user exists
    const currentUser = await User.findOne({ username: usernameCur });
    if (!currentUser) {
      return res.status(401).json({ error: 'Current user not found' });
    }

    // Check if the friend user exists
    const friendUser = await User.findOne({ username: usernameFri });
    if (!friendUser) {
      return res.status(401).json({ error: 'Friend username incorrect' });
    }

    // Check if they are already friends
    if (currentUser.friends.includes(friendUser._id)) {
      return res.status(400).json({ error: 'Already friends' });
    }

    // Add the friend to the current user's friend list
    currentUser.friends.push(friendUser._id);
    friendUser.friends.push(currentUser._id);
    await currentUser.save();
    await friendUser.save();

    res.status(200).json({ message: 'Friend request successful' });
  } catch (error) {
    console.error('Server error:', error);

    res.status(500).json({ error: 'Server error' });
  }
};

exports.pendingRequest = async (req, res) => {
    const { usernameCur, usernameFri } = req.body;
  
    try {
      // Check if the current user exists
      const currentUser = await User.findOne({ username: usernameCur });
      if (!currentUser) {
        return res.status(401).json({ error: 'Current user not found' });
      }
  
      // Check if they are already friends
      if (currentUser.friends.includes(friendUser._id)) {
        return res.status(400).json({ error: 'Already friends' });
      }
  
      // Add the friend to the current user's friend list
      currentUser.friends.push(friendUser._id);
      friendUser.friends.push(currentUser._id);
      await currentUser.save();
      await friendUser.save();
  
      res.status(200).json({ message: 'Friend request successful' });
    } catch (error) {
      console.error('Server error:', error);
  
      res.status(500).json({ error: 'Server error' });
    }
  };
