const router = require('express').Router()
const {User, Artwork} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'isVerified', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    console.log('req.params: ', req.params)
    const users = await User.findByPk(req.params.userId)
    const artwork = await users.getArtwork()
    users.dataValues.artwork = artwork
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const artwork = await User.findByPk(req.params.userId)
      await artwork.destroy()
      res.sendStatus(204)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})
