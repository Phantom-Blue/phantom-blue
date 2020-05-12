/* eslint-disable no-empty */
const router = require('express').Router()
const {Artwork, Tag, TaggedArtwork} = require('../db/models/Index')

router.post('/artworkId', async (req, res) => {
  const {tag} = req.params
  const {artworkId} = req.body
  try {
    const newtag = await Tag.findOrCreate({
      tag
    })

    await TaggedArtwork.create({
      artworkId: artworkId,
      tagId: newtag.id
    })

    const artworkToReturn = await Artwork.findOne({
      where: {
        id: artworkId
      },
      include: Tag
    })

    res.json(artworkToReturn)
  } catch (error) {
    console.error('could not get tags')
  }
})

module.exports = router
