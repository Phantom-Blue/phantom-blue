const router = require('express').Router()
const {Artwork, Location} = require('../db/models/Index')

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
