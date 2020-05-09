const Sequelize = require('sequelize');
const db = require('../db');

const Image = db.define('Images', {

  imageText: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  uploaderId: {
  },

});

module.exports = Image;
