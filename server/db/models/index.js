const User = require('./User')
const Artwork = require('./Artwork')
const Location = require('./Location')
const Tag = require('./Tag')
const TaggedArtwork = require('./TaggedArtwork')

// ASSOCIATIONS

Artwork.belongsTo(User)
User.hasMany(Artwork)

Location.hasMany(Artwork)
Artwork.belongsTo(Location)

Artwork.belongsToMany(Tag, {through: TaggedArtwork})
Tag.belongsToMany(Artwork, {through: TaggedArtwork})

module.exports = {
  User,
  Artwork,
  Location,
  Tag,
  TaggedArtwork
}
