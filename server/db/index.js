const db = require('./db')

// register models

const {Artwork, Location, Tag, User, TaggedArtwork} = require('./models')

module.exports = {db, Artwork, Location, Tag, User, TaggedArtwork}
