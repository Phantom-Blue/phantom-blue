const router = require('express').Router()
const {Artwork} = require('../db/models/Index')

router.put('/artworkId', async (req, res) => {
  const {id} = req.body
  try {
    const artworkToVerify = await Artwork.findOne({
      where: {
        id
      }
    })
    const verfiedArtwork = await artworkToVerify.update({
      isVerified: true
    })
    res.json(verfiedArtwork)
  } catch (error) {
    console.error('could not verify artwork')
  }
})

module.exports = router
