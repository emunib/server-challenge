const express = require('express');
const app = express();
require('dotenv').config();
const {PORT} = process.env;
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());

// routes


// start server
app.listen(PORT, function () {
    console.log(`the server is running on ${PORT}`);
});