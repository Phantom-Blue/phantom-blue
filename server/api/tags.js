/* eslint-disable no-empty */
const router = require('express').Router()
const {Artwork, Tag, TaggedArtwork} = require('../db/models')

router.post('/:artworkId', async (req, res) => {
  const {artworkId} = req.params
  const {tag} = req.body
  try {
    const newtag = await Tag.findOrCreate({
      where: {
        tag: tag
      }
    })
    res.json(newtag)
  } catch (error) {
    console.error('could not get tags')
  }
})

// CODE FOR FINISHING THE ADD TAG REQUESTSSSS
//HAS TO GO IN ANOTHER REQUEST I THINK
// console.log('NEW TAGGGGGGGGGGGGGG', newtag)
// const newTaggedArtwork = await TaggedArtwork.create({
//   artworkId: artworkId,
//   tagId: newtag[0].Tags.dataValues.id
// })

// const artworkToReturn = await Artwork.findOne({
//   where: {
//     id: artworkId
//   },
//   include: Tag
// })

module.exports = router
