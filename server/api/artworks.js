const router = require('express').Router()
const {Artwork, Location} = require('../db/models/Index')

// GET ALL ARTWORKS
router.get('/', async (req, res, next) => {
  try {
    const artworks = await Artwork.findAll()
    res.json(artworks)
  } catch (err) {
    next(err)
  }
})
// TODO: GET SINGLE ARTWORK BY ID

router.put('/artworkId', async (req, res) => {
  const {id} = req.body
  try {
    const artworkToVerify = await Artwork.findOne({
      where: {
        id
      }
    })
    const verfiedArtwork = await artworkToVerify.update({
      isVerified: true
    })
    res.json(verfiedArtwork)
  } catch (error) {
    console.error('could not verify artwork')
  }
})

module.exports = router
