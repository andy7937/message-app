// src/models/Chat.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});


const groupChatSchema = new mongoose.Schema({
  participants: {
    type: [String],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  messages: [messageSchema]
});

const GroupChat = mongoose.model('GroupChat', groupChatSchema);

module.exports = { GroupChat };