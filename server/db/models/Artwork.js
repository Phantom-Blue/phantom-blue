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
    allowNull: true,
    defaultValue: false
  },

  timestamp: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },

  imageUrl: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false
  }
})

module.exports = Artwork
