const express = require('express');
const app = express();
require('dotenv').config();
const {PORT} = process.env;
const cors = require('cors');
const mongoose = require('mongoose');

// connect to db
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to database');
    } catch (err) {
        console.log('Could not connect to database', err);
    }
};

connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes


// start server
app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
});