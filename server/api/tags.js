/* eslint-disable no-empty */
const router = require('express').Router()
const {Artwork, Tag, TaggedArtwork} = require('../db/models')

router.post('/:artworkId', async (req, res) => {
  const {artworkId} = req.params
  const {tag} = req.body

  try {
    if (req.user) {
      const newTag = await Tag.findOrCreate({
        where: {
          tag: tag
        }
      })

      if (newTag) {
        const tagged = await TaggedArtwork.create({
          ArtworkId: artworkId,
          TagId: newTag[0].dataValues.id
        })
        res.json(tagged)
      } else {
        res.json('Failed to find or create tag.')
      }
    } else {
      res.json('Log in to tag artwork.')
    }
  } catch (error) {
    console.error(error)
  }
})

router.delete('/:artworkId', async (req, res, next) => {
  try {
    if (req.user) {
      const {tagId} = req.body
      if (req.user.isAdmin) {
        if (tagId) {
          const deleted = await TaggedArtwork.destroy({
            where: {ArtworkId: req.params.artworkId, TagId: tagId}
          })
          if (deleted) {
            res.json('Tag removed successfully.')
          } else {
            res.json('Failed to remove tag.')
          }
        } else {
          res.json('Enter a valid tag id.')
        }
      } else {
        res.json('You are not authorized to remove tags.')
      }
    } else {
      res.json('Log in to remove tags.')
    }
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
