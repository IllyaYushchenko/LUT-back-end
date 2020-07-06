const express = require('express');
const router = express.Router();
const Album = require('../models/album');

// Getting all
router.get('/', async (req, res) => {
  try {
    const albums = await Album.find()
    res.json(albums)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getAlbum, (req, res) => { 
  res.json(res.album)
})

// Creating one
router.post('/', async (req, res) => {
  const album = new Album({
    name: req.body.name,
    dateOfRelease: req.body.dateOfRelease,
    band: req.body.band
  })
  try {
    const newAlbum = await album.save()
    res.status(201).json(newAlbum)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getAlbum, async (req, res) => {
  if (req.body.name != null) {
    res.album.name = req.body.name
  }
  if (req.body.dateOfRelease != null) {
    res.album.dateOfRelease = req.body.dateOfRelease
  }
  if (req.body.band != null) {
    res.album.band = req.body.band
  }
  try {
    const updatedAlbum = await res.album.save()
    res.json(updatedAlbum)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getAlbum, async (req, res) => {
  try {
    await res.album.remove()
    res.json({ message: 'Deleted Album' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getAlbum(req, res, next) {
  let album
  try {
   album = await Album.findById(req.params.id)
    if (!album) {
      return res.status(404).json({ message: 'Cannot find album' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.album = album
  next()
}


module.exports = router;