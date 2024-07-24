// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phonenum: {
    type: String,
    required: true
  },
  // array of friends with their username
  friends: [{
    type: String, 
  }],
  // array of pending friend requests with their username
  friendsPending: [{
    type: String, 
  }],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;