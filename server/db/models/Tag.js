const Sequelize = require('sequelize')
const db = require('../db')

const Tag = db.define('Tags', {
  tag: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Tag
