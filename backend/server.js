// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

// Routes
app.use('/api/users', userRoutes);

// Database connection
mongoose.connect('mongodb://localhost:27017/ChatStream')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
