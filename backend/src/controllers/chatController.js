// src/controllers/chatController.js
const { Chat, GroupChat } = require('../models/Chat');

// Create or retrieve chat
exports.getOrCreateChat = async (req, res) => {
  const { user1, user2 } = req.params;
  const participants = [user1, user2].sort();

  try {
    let chat = await Chat.findOne({ participants });
    if (!chat) {
      chat = new Chat({ participants, messages: [] });
      await chat.save();
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create or retrieve group chat
exports.getOrCreateGroupChat = async (req, res) => {
  const { users, name } = req.body;
  const participants = users.sort();

  try {
    let groupChat = await GroupChat.findOne({ participants, name });
    if (!groupChat) {
      groupChat = new GroupChat({ participants, name, messages: [] });
      await groupChat.save();
    }
    res.status(200).json(groupChat);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Send a message
exports.sendMessage = async (req, res) => {
  const { user1, user2 } = req.params;
  const { sender, message } = req.body;
  const participants = [user1, user2].sort();

  try {
    const chat = await Chat.findOne({ participants });
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    const newMessage = { sender, message, timestamp: new Date() };
    chat.messages.push(newMessage);
    await chat.save();

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Send a group message
exports.sendGroupMessage = async (req, res) => {
  const { users } = req.body;
  const { sender, message } = req.body;
  const participants = users.sort();

  try {
    const groupChat = await GroupChat.findOne({ participants });
    if (!groupChat) {
      return res.status(404).json({ error: 'Group Chat not found' });
    }

    const newMessage = { sender, message, timestamp: new Date() };
    groupChat.messages.push(newMessage);
    await groupChat.save();

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};