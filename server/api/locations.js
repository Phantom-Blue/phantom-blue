/* eslint-disable no-warning-comments */
const router = require('express').Router()
const {Artwork, Location, Tag} = require('../db/models')
const axios = require('axios')
// require('..')

router.get('/geojson', async (req, res, next) => {
  try {
    const geoJSON = await Location.convertToGeo()
    res.send(geoJSON)
  } catch (err) {
    next(err)
  }
})

// router.post('/tileset', (req, res, next) => {

// })

router.post('/tileset', async (req, res, next) => {
  try {
    const location = await Location.findByPk(req.body.id)
    const feature = location.convertToGeo()

    if (feature) {
      await axios.put(
        `https://api.mapbox.com/datasets/v1/mstykmshy/ckaejyuag0g6u22pnkxura0z0/features/${
          req.body.id
        }?access_token=${process.env.MAPBOX_DATA_KEY}`,
        feature
      )
      res.send('ok')
    } else {
      res.send('Something went wrong :(')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:lat', async (req, res, next) => {
  // TODO: Route working fine, but consider refactoring for consistency/readability later.

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
  try {
    const nearbyArt = await Location.getNearbyArt(radius, long, lat)
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
