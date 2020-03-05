const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()
const { loadCurrentQueue } = require('../Models/queue.js')

//Get all tracks from DBs
router.get('/', async (req, res) => {
  var tracks = await loadCurrentQueue()
  res.send(await tracks.find({}).toArray())
})

router.post('/', async(req, res) => {
  const tracks = await loadCurrentQueue()
  await tracks.insertOne({title: req.body.title, artist: req.body.artist} )
  res.status(201).send()
})

router.delete('/:_id', async(req, res) => {
  const tracks = await loadCurrentQueue()
  await tracks.deleteOne({ _id: new mongodb.ObjectID(req.params._id) })
  res.status(201).send()
})



module.exports = router
