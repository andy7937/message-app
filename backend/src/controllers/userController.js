// src/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

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
      friends: [],
      friendsPending: []
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

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.status(200).json({ message: 'User Login Successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// returns user data
exports.getUser = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
