const mongoose = require('mongoose')
const musicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50
    },
    artist: {
        type: String,
        required: true,
        maxLength: 30
    },
    genre: {
        type: String,
        enum: ['Pop', 'RnB', 'Afro-beats','Dance hall'],
    },
    album: {
        type: String,
        maxLength: 20    
    },
    Number : {type: Number, required: true}
},
{timestamps: true})

const Music = mongoose.model('Music', musicSchema)
module.exports = Music;