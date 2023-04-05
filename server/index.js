const express = require('express');
const app = express();
require('dotenv').config();
const {PORT} = process.env || 8080;
const cors = require('cors');
const mongoose = require('mongoose');
const {InventoryRoutes, WarehouseRoutes} = require('./routes');

/**
 * Connects to MongoDB using URI from .env file.
 * @returns {Promise<void>}
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to database');
    } catch (err) {
        console.log('Could not connect to database', err);
    }
};

// connect to database asynchronously
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/inventory', InventoryRoutes);
app.use('/api/warehouse', WarehouseRoutes);

// start server
app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
});