const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('Locations', {
  longitude: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  latitude: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Location
