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

//Routes..
//Create route.....
app.post('/music', async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(422).json({ message: 'Title field is required.' })
        }
        if (!req.body.artist) {
            return res.status(422).json({ message: 'Artist field is required.' })
        }
        if (!req.body.genre) {
            return res.status(422).json({ message: 'Genre field is required.' })
        } else if (!Music.schema.path("genre").enumValues.includes(req.body.genre)) {
            return res.status(422).json({ message: `Music genre MUST fall in the following categories ${Music.schema.path("genre").enumValues.join(', ')}` })
        }

        const music = await Music.create(req.body)
        return res.status(201).json(music)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

//Index Route.....
app.get('/music', async (req, res) => {
    try {
        const music = await Music.find({}).select('-__v')
        return res.status(200).json(music)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})
