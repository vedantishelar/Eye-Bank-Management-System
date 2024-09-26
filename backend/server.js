//to handle requests from the front end and integrate MongoDB



const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

// Import Routes
const authRoutes = require('./routes/auth');
const donorRoutes = require('./routes/donors');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = keys.mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/donors', donorRoutes);

// Serve static files (your frontend files)
app.use(express.static('public'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
