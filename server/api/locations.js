const router = require('express').Router()
const {Artwork, Location, Tag, TaggedArtwork} = require('../db/models')

router.get('/:lat', async (req, res, next) => {
  const {long} = req.query
  const {lat} = req.params

  try {
    const location = await Location.findOne({
      where: {
        latitude: lat,
        longitude: long
      }
    })

    const artworksToReturn = await Artwork.findAll({
      where: {
        LocationId: location.id
      },
      include: Tag
    })

    res.json(artworksToReturn)
  } catch (err) {
    next(err)
  }
})

router.get('/artNearby/:id', async (req, res, next) => {
  try {
    const location = await Location.findByPk(req.params.id)
    const nearbyArt = await location.getNearbyArt(10000)
    res.send(nearbyArt)
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
