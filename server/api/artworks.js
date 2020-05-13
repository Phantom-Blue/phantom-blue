const router = require('express').Router()
const {Artwork, Location} = require('../db/models/Index')

// router.get('/', async (req, res, next) => {
//   const {latitude, longitude} = req.params
//   try {
//     const locationArtwork = await Location.findOne({
//       where: {
//         latitude,
//         longitude
//       },
//       include: Artwork
//     })
//     res.json(locationArtwork.artwork)
//   } catch (err) {
//     next(err)
//   }
// })

// router.put('/artworkId', async (req, res) => {
//   const {id} = req.body
//   try {
//     const artworkToVerify = await Artwork.findOne({
//       where: {
//         id
//       }
//     })
//     const verfiedArtwork = await artworkToVerify.update({
//       isVerified: true
//     })
//     res.json(verfiedArtwork)
//   } catch (error) {
//     console.error('could not verify artwork')
//   }
// })

// router.get('/', async (req, res, next) => {
//   try {
//     const artwork = await Artwork.findAll();
//     res.json(artwork);
//   } catch (err) {
//     next(err)
//   }
// })

// router.get('/:ArtworkId', async (req, res, next) => {
//   try {
//     // if (req.user && req.user.isAdmin) {
//       const artwork = await Artwork.findByPk(req.params.ArtworkId)
//       res.json(artwork)
//     // } else {
//       // res.sendStatus(403)
//     // }
//   } catch (err) {
//     next(err)
//   }
// })

router.delete('/:ArtworkId', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const artwork = await Artwork.findByPk(req.params.ArtworkId)
      await artwork.destroy()
      res.sendStatus(204)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
