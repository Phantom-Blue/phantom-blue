const Artwork = require('./Artwork')
const User = require('./user')
const Location = require('./Location')
const Tag = require('./Tag')
const TaggedArtwork = require('./TaggedArtwork')

// ASSOCIATIONS

Artwork.belongsTo(Location, {foreignKey: {allowNull: false}})
Location.hasMany(Artwork)

Artwork.belongsTo(User)
User.hasMany(Artwork)

Artwork.belongsToMany(Tag, {through: TaggedArtwork})
Tag.belongsToMany(Artwork, {through: TaggedArtwork})

module.exports = {
  User,
  Artwork,
  Location,
  Tag,
  TaggedArtwork
}
