const router = require('express').Router()
const {Artwork, Location, Tag} = require('../db/models')
const cloudinary = require('cloudinary')
cloudinary.config({
  cloud_name: 'pentimento',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// GET ALL ARTWORKS

router.get('/', async (req, res, next) => {
  try {
    const artworks = await Artwork.findAll({
      include: Location
    })
    console.log(req)
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
      include: [Tag, Location]
    })
    res.json(artwork)
  } catch (err) {
    next(err)
  }
})

router.delete('/:ArtworkId', async (req, res, next) => {
  try {
    const artwork = await Artwork.findByPk(req.params.ArtworkId)
    if (
      (req.user && req.user.isAdmin) ||
      req.user.id === artwork.dataValues.UserId
    ) {
      await artwork.destroy()
      res.send(req.params.ArtworkId)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

// eslint-disable-next-line complexity
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
        latitude,
        longitude,
        address,
        imageUrl,
        imageFile
      } = req.body
      let isVerified = false

      // *** Comment out the following if statement
      if (req.user.isVerified || req.user.isAdmin) {
        isVerified = true
      }

      if (latitude && longitude && address && imageFile) {
        await cloudinary.v2.uploader.upload(imageFile, function(error, result) {
          console.log(result, error)
          imageUrl = result.secure_url
        })

        const location = await Location.findOrCreate({
          where: {
            latitude,
            longitude,
            address
          }
        })

        let newArt = await Artwork.create({
          artist,
          description,
          timestamp,
          imageUrl: [imageUrl],
          isVerified,
          UserId,
          LocationId: location[0].dataValues.id
        })

        newArt.dataValues.Location = location[0]

        if (newArt) {
          res.json(newArt)
        } else {
          res.json('Failed to post.')
        }
      }
    } else {
      res.send('Log in to make a post.')
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:artworkId', async (req, res) => {
  //TODO: Move this route to /:artworkId/verify

  try {
    const {artworkId} = req.params
    if (req.user && req.user.id) {
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
    } else {
      res.json('Log in to verify artwork.')
    }
  } catch (error) {
    console.error('Could not verify artwork')
  }
})

router.put('/:artworkId/edit', async (req, res, next) => {
  //TODO: Move this route to /:artworkId

  try {
    const id = req.params.artworkId

    let userId = null
    if (req.user) {
      userId = req.user.id
    }
    const art = await Artwork.findByPk(id)
    if ((req.user && req.user.isAdmin) || userId === art.UserId) {
      let {artist, description, imageUrl, address} = req.body

      let artwork = {artist, description, imageUrl, address}

      await Artwork.update(artwork, {where: {id: id}})

      const updatedArtwork = await Artwork.findByPk(id)

      if (updatedArtwork) {
        res.json(updatedArtwork)
      } else {
        res.json('Failed to update.')
      }
    } else {
      res.json('You do not have edit permission.')
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
