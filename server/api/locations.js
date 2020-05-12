const router = require('express').Router()
const {Artwork, Location, Tag} = require('../db/models/Index')

router.get('/', async (req, res, next) => {
  const {latitude, longitude} = req.params
  try {
    const location = await Location.findOne({
      where: {
        latitude,
        longitude
      }
    })

    const artworksToReturn = await Artwork.findAll({
      where: {
        locationId: location.id
      },
      include: Tag
    })

    res.json(artworksToReturn)
  } catch (err) {
    next(err)
  }
})

module.exports = router
