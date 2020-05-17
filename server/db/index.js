const db = require('./db')

// register models

const User = require('./models/user')
const {Artwork, Location, Tag, TaggedArtwork} = require('./models')

module.exports = {db, Artwork, Location, Tag, User, TaggedArtwork}
