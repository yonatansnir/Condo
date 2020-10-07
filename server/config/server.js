const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
// socket configuration will come here.

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB
const connectDB = require('./db');
connectDB();

// Routes
app.use('/items', require('../routes/items'))

const port = process.env.PORT
server.listen(
    port,
    console.log('Server is Running on port ' + port)
)

module.exports = {
    app
}