const Sequelize = require('sequelize')
const db = require('../db')

const Artwork = db.define('Artworks', {
  artist: {
    type: Sequelize.STRING,
    allowNull: true
  },

  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },

  isVerified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = Artwork
