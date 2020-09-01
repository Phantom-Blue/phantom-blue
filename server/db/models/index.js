const Artwork = require('./Artwork')
const User = require('./user')
const Location = require('./Location')
const Tag = require('./Tag')
const TaggedArtwork = require('./TaggedArtwork')
const FavoriteArtwork = require('./FavoriteArtwork')

// ASSOCIATIONS

Artwork.belongsTo(Location, {foreignKey: {allowNull: false}})
Location.hasMany(Artwork)

User.belongsToMany(Artwork, {through: FavoriteArtwork})
Artwork.belongsToMany(User, {through: FavoriteArtwork})

Artwork.belongsTo(User)
User.hasMany(Artwork)

Artwork.belongsToMany(Tag, {through: TaggedArtwork})
Tag.belongsToMany(Artwork, {through: TaggedArtwork})

module.exports = {
  User,
  Artwork,
  Location,
  Tag,
  TaggedArtwork,
  FavoriteArtwork
}
