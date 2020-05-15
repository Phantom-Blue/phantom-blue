const router = require('express').Router()
const {Artwork, Location, Tag} = require('../db/models')

// GET ALL ARTWORKS

router.get('/', async (req, res, next) => {
  try {
    const artworks = await Artwork.findAll({
      include: Location
    })
    res.json(artworks)
  } catch (err) {
    next(err)
  }
})

router.get('/verified', async (req, res, next) => {
  try {
    const verifiedArtworks = await Artwork.findAll({
      where: {
        isVerified: true
      },
      include: Location
    })
    res.json(verifiedArtworks)
  } catch (err) {
    next(err)
  }
})

router.get('/artbylocation/:locationId', async (req, res, next) => {
  const {locationId} = req.params
  try {
    const artByLocationId = await Artwork.findAll({
      where: {
        LocationId: locationId
      },
      include: Location
    })
    res.json(artByLocationId)
  } catch (err) {
    next(err)
  }
})

router.get('/:artworkId', async (req, res, next) => {
  const {artworkId} = req.params
  try {
    // console.log(req.params)
    const artwork = await Artwork.findByPk(artworkId, {
      include: Tag
    })
    res.json(artwork)
  } catch (err) {
    next(err)
  }
})

router.put('/:artworkId', async (req, res) => {
  const {artworkId} = req.params
  try {
    const artworkToVerify = await Artwork.findOne({
      where: {
        id: artworkId
      },
      include: Tag
    })
    const verfiedArtwork = await artworkToVerify.update({
      isVerified: true
    })
    res.json(verfiedArtwork)
  } catch (error) {
    console.error('could not verify artwork')
  }
})

router.get('/', async (req, res, next) => {
  try {
    const artwork = await Artwork.findAll()
    res.json(artwork)
  } catch (err) {
    next(err)
  }
})

// router.get('/:ArtworkId', async (req, res, next) => {
//   try {
// if (req.user && req.user.isAdmin) {
//       const artwork = await Artwork.findByPk(req.params.ArtworkId)
//       res.json(artwork)
// } else {
// res.sendStatus(403)
// }
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

router.post('/', async (req, res, next) => {
  /* To test with Postman, follow the commented instructions */

  try {
    // *** Change this to 'if (!req.user)'
    if (req.user) {
      // *** Set UserId equal to 1
      const UserId = req.user.id

      let {
        artist,
        description,
        timestamp,
        imageUrl,
        latitude,
        longitude,
        address
      } = req.body
      if (imageUrl && !Array.isArray(imageUrl)) {
        imageUrl = [imageUrl]
      }
      let isVerified = false

      // *** Comment out the following if statement
      if (req.user.isVerified || req.user.isAdmin) {
        isVerified = true
      }

      const location = await Location.findOrCreate({
        where: {
          latitude,
          longitude,
          address
        }
      })

      console.log(location)

      let newArt = await Artwork.create({
        artist,
        description,
        timestamp,
        imageUrl,
        isVerified,
        UserId,
        LocationId: location[0].dataValues.id
      })

      newArt.dataValues.Location = location[0]
      console.log('The newest art ', newArt)
      // const newArt = await Artwork.findByPk(make.id, {include: Location})
      if (newArt) {
        res.json(newArt)
      } else {
        res.json('Failed to post.')
      }
    } else {
      res.send('Log in to make a post.')
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:artworkId/edit', async (req, res, next) => {
  const id = req.params.artworkId
  try {
    if (req.user) {
      let {artist, description, imageUrl} = req.body

      let artwork = {artist, description, imageUrl}

      const updatedArtwork = await Artwork.update(artwork, {where: {id: id}})

      if (updatedArtwork) {
        res.json(updatedArtwork)
      } else {
        res.json('Failed to updated.')
      }
    } else {
      res.json('log in to update.')
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
