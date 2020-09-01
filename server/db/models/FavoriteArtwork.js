const Sequelize = require('sequelize')
const db = require('../db')

const FavoriteArtwork = db.define('FavoriteArtworks', {})

module.exports = FavoriteArtwork
