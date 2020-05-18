const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const users = await User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'isVerified', 'email']
      })
      res.json(users)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const user = await User.findByPk(req.params.userId)
      const artwork = await user.getArtwork()
      user.dataValues.artwork = artwork
      res.json(user)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const deleted = await User.destroy({where: {id: req.params.userId}})
      if (deleted) {
        res.sendStatus(204)
      } else {
        res.sendStatus(304)
      }
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})
