const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT;
const colors = require('colors');
const morgan = require('morgan');
const Music = require('./models/Music')

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Developer loggers
app.use('/music',require('./routes/MusicRoute'))

// DB CONNECTION
mongoose.connect(process.env.DATABASE_URL)

// DB Success message
mongoose.connection.on('connected', () => {
    console.log(`DATABASE CONNECTED.....`.green.bold.inverse);
    app.listen(port, () => {
        console.log(`Server running on PORT: ${port}.....`.cyan.bold.inverse);
    });
});
// DB Failure message
mongoose.connection.on('error', (error) => {
    console.log(`Connection Error: ${error.message}`.red.bold);
});

