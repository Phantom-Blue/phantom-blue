const Sequelize = require('sequelize')
const db = require('../db')

const FavoriteArtwork = db.define('FavoriteArtwork', {})

module.exports = FavoriteArtwork
