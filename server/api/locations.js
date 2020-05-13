const router = require('express').Router()
const {Location} = require('../db/models/Index')

router.get('/artNearby/:id', async (req, res, next) => {
  try {
    const location = await Location.findByPk(req.params.id)
    const nearbyArt = await location.getNearbyArt(1000)
    res.send(nearbyArt)
  } catch (err) {
    next(err)
  }
})

module.exports = router
