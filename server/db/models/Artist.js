const Sequelize = require('sequelize');
const db = require('../db');

const Artist = db.define('Artists', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  lastName: {
    type: Sequelize.TEXT,
    allowNull: true,
  },

  isVerified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Artist;
