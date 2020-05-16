const Sequelize = require('sequelize')
const db = require('../db')
const Artwork = require('./Artwork')

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

class GeoLocationBounds {
  constructor(myLongitude, myLatitude, distance) {
    this.earthsRadius = 6371 * 1000.0
    this.myLongitude = myLongitude // float
    this.myLatitude = myLatitude // float
    this.distance = distance // fixnum (distance represents distance in meters from your location)
  }
}

GeoLocationBounds.prototype.deltaLatitude = function() {
  return this.distance / this.earthsRadius / Math.PI * 180
}

GeoLocationBounds.prototype.deltaLongitude = function() {
  return this.myLatitude * (1 / Math.cos(this.myLatitude * Math.PI / 180))

  // ----------vvvvv------------ Ignore these comments ----------vvvvv------------
  // console.log("Delta: ",(this.myLatitude / Math.cos(this.myLatitude)) * Math.PI / 180)
  // let r = this.distance / this.earthsRadius
  // let latT = Math.asin(Math.sin(this.myLatitude)/Math.cos(r))
  // // let Alon = Math.asin(Math.sin(r)/Math.cos(this.myLatitude))
  // let Alon  = Math.acos( ( Math.cos(r) - Math.sin(latT) * Math.sin(this.myLatitude) ) / ( Math.cos(latT) * Math.cos(this.myLatitude) ) )
  // console.log("Alon!", Alon)
  // console.log("returning ", ((this.myLatitude / Math.cos(this.myLatitude)) * Math.PI / 180)*-1)
  // console.log(this.myLatitude * (1 / Math.cos(this.myLatitude * Math.PI / 180)))
  // // return ((this.myLatitude / Math.cos(this.myLatitude)) * Math.PI / 180)*-1
  //-------------------------------------------------------------------------------
}

GeoLocationBounds.prototype.points = function() {
  return {
    latitude: {
      min: this.myLatitude - this.deltaLatitude(),
      max: this.myLatitude * 1 + this.deltaLatitude()
    },
    longitude: {
      min: this.myLongitude - this.deltaLongitude(),
      max: this.myLongitude * 1 + this.deltaLongitude()
    }
  }
}

Location.prototype.getNearbyLocations = async function(radius) {
  let locations = await Location.findAll()
  locations = locations.map(location => location.dataValues)
  const bounds = new GeoLocationBounds(this.longitude, this.latitude, radius)
  const ranges = bounds.points()

  const nearby = locations.filter(location => {
    return (
      ranges.latitude.min <= location.latitude &&
      location.latitude <= ranges.latitude.max &&
      ranges.longitude.min <= location.longitude &&
      location.longitude <= ranges.longitude.max
    )
  })
  return nearby
}

Location.prototype.getNearbyArt = async function(radius) {
  const nearbyLocations = await this.getNearbyLocations(radius)
  const nearbyIds = nearbyLocations.map(location => location.id)
  const allArt = await Artwork.findAll()
  const nearbyArt = allArt
    .map(art => art.dataValues)
    .filter(work => nearbyIds.includes(work.LocationId))

  return nearbyArt
}

Location.getNearbyArt = async function(radius, longitude, latitude) {
  let locations = await Location.findAll()
  locations = locations.map(location => location.dataValues)
  const bounds = new GeoLocationBounds(longitude, latitude, radius)
  const ranges = bounds.points()

  const nearby = locations.filter(location => {
    return (
      ranges.latitude.min <= location.latitude &&
      location.latitude <= ranges.latitude.max &&
      ranges.longitude.min <= location.longitude &&
      location.longitude <= ranges.longitude.max
    )
  })

  const nearbyIds = nearby.map(location => location.id)
  const allArt = await Artwork.findAll()
  const nearbyArt = allArt
    .map(art => art.dataValues)
    .filter(work => nearbyIds.includes(work.LocationId))

  return nearbyArt
}

module.exports = Location
