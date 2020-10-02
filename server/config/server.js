const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
// socket configuration will come here.

// Midlewhere
app.use(cors());
app.use(express.json());


const port = process.env.PORT
server.listen(
    port,
    console.log('Server is Running on port '+ port)
)

module.exports = { app }