const router = require('express').Router()
const cloudinary = require('cloudinary')
require('../../secrets')
cloudinary.config({
  cloud_name: 'pentimento',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

router.post('/upload', (req, res, next) => {
  cloudinary.v2.uploader.upload('public/looking.jpg', function(error, result) {
    console.log(result, error)
  })
  res.send('Hi')
})

module.exports = router
