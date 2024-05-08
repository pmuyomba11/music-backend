const router = require('express').Router()
const mongoose = require('mongoose')
const Music = require('../models/Music')
const MusicController = require('../controllers/MusicController')


//Routes..
//Create route.....
router.post('', MusicController.createEntity)

//Index Route.....
router.get('', MusicController.getAllEntities)

//Show route..
router.get('/:id', MusicController.getSingleEntity)

//Update route....
router.put('/:id', MusicController.updateEntity)


//delete route....
router.delete('/:id', MusicController.deleteEntity)

module.exports = router