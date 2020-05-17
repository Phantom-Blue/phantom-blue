const router = require('express').Router()
const {Artwork, Location, Tag} = require('../db/models')

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

router.get('/artNearby/:radius/:long/:lat', async (req, res, next) => {
  const {radius, long, lat} = req.params
  console.log('REQ DAT PARAMSSSSSSSSS =>>>>>>>', radius, long, lat)
  try {
    const nearbyArt = await Location.getNearbyArt(radius, long, lat)
    // console.log(nearbyArt, 'NEARBY ART IN API REQUEST')
    res.send(nearbyArt)
  } catch (err) {
    next(err)
  }
})

router.get('/artNearby/:radius/:id', async (req, res, next) => {
  try {
    const location = await Location.findByPk(req.params.id)
    const nearbyArt = await location.getNearbyArt(req.params.radius)
    res.send(nearbyArt)
  } catch (err) {
    next(err)
  }
})

module.exports = router
