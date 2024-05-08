const express = require('express')
const mongoose = require('mongoose')
const Music = require('../models/Music')


exports.createEntity = async (req, res) => {
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
}


exports.getAllEntities = async (req, res) => {
    try {
        const music = await Music.find({}).select('-__v')
        return res.status(200).json(music)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.getSingleEntity = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(404).json({ message: 'ID not located' })
        }
        const showMusic = await Music.findById(req.params.id)
        if (!showMusic) {
            return res.status(404).json({ message: 'Music not found' })
        }
        return res.status(200).json(showMusic)

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.updateEntity = async (req, res) => {
    try {
        if (! await Music.exists({ _id: req.params.id })) {
            return res.status(404).json({ message: 'Music not found' })
        }
        const updateMusic = await Music.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updateMusic) {
            return res.status(422).json({ message: 'Sorry, we cannot update the music' })
        }
        return res.status(201).json(updateMusic)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

exports.deleteEntity = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(404).json({ message: 'Id IS NOT LOCATED' })
        }
        const deletedMusic = await Music.findByIdAndDelete(req.params.id)
        if (!deletedMusic) {
            return res.status(422).json({ message: 'Check Id' })
        }
        return res.status(200).json({ message: 'Successfully deleted!' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}