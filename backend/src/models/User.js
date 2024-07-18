// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
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
  // array of friends with their userID
  friends: [{
    type: String, 
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;