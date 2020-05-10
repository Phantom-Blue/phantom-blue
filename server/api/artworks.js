const router = require('express').Router();
const { Artwork, Location } = require('../db/models/Index');

router.get('/:location', async (req, res, next) => {
  const { latitude, longitude } = req.body;
  try {
    const locationArtwork = await Location.findOne({
      where: {
        latitude,
        longitude,
      },
      include: Artwork,
    });
    res.json(locationArtwork);
  } catch (err) {
    next(err);
  }
});


module.exports = router;
