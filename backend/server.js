// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const chatRoutes = require('./src/routes/chatRoutes');
const groupChatRoutes = require('./src/routes/groupChatRoutes');

const app = express();
const port = process.env.PORT || 5000; // Fallback to port 5000 if PORT is not set
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://andy:helloyellow123@messageapp.wjpp3oh.mongodb.net/';

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

// Routes
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/groupchat', groupChatRoutes);

// Database connection
mongoose.connect(mongoURI)


app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
