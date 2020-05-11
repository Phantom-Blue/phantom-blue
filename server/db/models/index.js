const User = require('./User')
const Artwork = require('./Artwork')
const Artist = require('./Artist')
const FavoriteArtwork = require('./FavoriteArtwork')
const Image = require('./Image')
const Location = require('./Location')

// ASSOCIATIONS

Artwork.belongsToMany(User, {through: FavoriteArtwork})
User.belongsToMany(Artwork, {through: FavoriteArtwork})

Artwork.belongsTo(Image)
Image.hasOne(Artwork)

Location.belongsTo(Artwork)
Artwork.hasOne(Location)

// VVVVV THESE DON'T WORK VVVVV

// User.belongsToMany(Artwork, { as: 'uploader' });

// Artist.belongsToMany(Artwork);
// Artwork.hasOne(Artist);

// User.belongsToMany(Image);
// Image.hasOne(User);

// MODEL EXPORTS

module.exports = {
  User,
  Artwork,
  Artist,
  FavoriteArtwork,
  Image,
  Location
}
