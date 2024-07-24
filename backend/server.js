// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes'); // Import dashboardRoutes
const chatRoutes = require('./src/routes/chatRoutes'); // Import chatRoutes
const groupChatRoutes = require('./src/routes/groupChatRoutes'); // Import groupChatRoutes
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

// Routes
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/chat', chatRoutes); 
app.use('/api/groupchat', groupChatRoutes);

// Database connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});