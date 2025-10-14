const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// MongoDB connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tododb';
mongoose.connect(uri)
    .then(() => console.log('MongoDB connection established successfully'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});