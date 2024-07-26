const { GroupChat } = require('../models/GroupChat');

// Create or retrieve group chat
exports.createGroupChat = async (req, res) => {
    const { users, name, admins } = req.body;
    const participants = users.sort();
  
    try {
      let groupChat = await GroupChat.findOne({ participants, name });
      if (!groupChat) {
        groupChat = new GroupChat({ participants, admins, name, messages: [] });
        await groupChat.save();
      }
      res.status(200).json(groupChat);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // get all group chats associated with the username
  exports.getGroupChat = async (req, res) => {
    const { username } = req.params;
  
    try {
      const groupChats = await GroupChat.find({ participants: username });
      res.status(200).json(groupChats);
    }
    catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
// Get a specific group chat
exports.openGroupChat = async (req, res) => {
  const { groupChatName } = req.params;

  try {
    const groupChat = await GroupChat.findOne({ name: groupChatName });
    if (!groupChat) {
      return res.status(404).json({ error: 'Group Chat not found' });
    }
    res.status(200).json(groupChat);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
  
  
  // Send a group message
  exports.sendGroupMessage = async (req, res) => {
    const { sender, message, groupChatName } = req.body;
  
    try {
      const groupChat = await GroupChat.findOne({ name: groupChatName });
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

  exports.deleteGroupChat = async (req, res) => {
    const { groupChatName } = req.params;
  
    try {
      const groupChat = await GroupChat.findOneAndDelete({ name: groupChatName });
      if (!groupChat) {
        return res.status(404).json({ error: 'Group Chat not found' });
      }
      res.status(200).json({ message: 'Group Chat deleted' });
    }
    catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
