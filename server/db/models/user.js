const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('Users', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false
  },

  isVerified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },

  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },

  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: true
  }
})

module.exports = User
