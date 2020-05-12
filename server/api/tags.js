/* eslint-disable no-empty */
const router = require('express').Router()
const {Artwork, Tag, TaggedArtwork} = require('../db/models/Index')

router.put('/artworkId', async (req, res) => {
  const {artworkId} = req.body
  const {tagsArray} = req.params

  tagsArray.forEach(tag => {
    /// CREATE HOOK TO CHECK FOR EXISTING TAG
    /// CREATE TAG IF IT DOESNT EXIST
  })
  /// CREATE TAGGEDARTWORK W ARTWORK ID AND TAG ID

  try {
  } catch (error) {
    console.error('could not verify artwork')
  }
})

module.exports = router

// CRAFTING CREATE TAG HOOK TO CHECK ITS NOT ALREADY IN DB
// FALLING ASLEEP ........
// Tag.beforeCreate(async (tag) =>{
//     const tagToCheck = Tag.findOne({
//         where: {
//             tag
//         }
//     })
// })
