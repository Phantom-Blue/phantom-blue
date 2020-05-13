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
        locationId: location.id
      },
      include: Tag
    })
    console.log('RETRIEVED SUCCESSFULLY')
    res.json(artworksToReturn)
  } catch (err) {
    next(err)
  }
})

module.exports = router
