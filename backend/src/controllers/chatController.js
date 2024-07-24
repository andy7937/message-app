// src/controllers/chatController.js
const { Chat } = require('../models/Chat');


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

exports.removeChat = async (req, res) => {
  const { user1, user2 } = req.params;
  const participants = [user1, user2].sort();

  try {
    const chat = await Chat.findOneAndDelete({ participants });
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    res.status(200).json({ message: 'Chat removed' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

