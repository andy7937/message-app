// src/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  const { username, email, password, phonenum } = req.body;

  try {
    // Check if the email is used
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already used' });
    }

    // Check if the username is used
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(401).json({ error: 'Username already used' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phonenum,
      friends: []
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// logging in user confirmation
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Username incorrect' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(402).json({ error: 'Password incorrect' });
    }

    res.status(200).json({ message: 'User Login Successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
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
