const Sequelize = require('sequelize')
const db = require('../db')
const Artwork = require('./Artwork')
const axios = require('axios')
require('../../../secrets')

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
  const allArt = await Artwork.findAll({
    include: Location
  })
  const nearbyArt = allArt
    .map(art => {
      return art.dataValues
    })
    .filter(work => nearbyIds.includes(work.LocationId))
  return nearbyArt
}

Location.convertToGeo = async function() {
  // console.log("IT STARTED")
  const locations = await Location.findAll()
  // console.log("LOCATIONSNSINISN",locations)
  const GeoJSON = locations.map(location => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [location.longitude * 1, location.latitude * 1]
      },
      properties: {
        id: location.id * 1
      }
    }
  })
  return GeoJSON
  // return "Hi"
}

Location.prototype.convertToGeo = function() {
  return {
    id: `${this.id}`,
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [this.longitude * 1, this.latitude * 1]
    },
    properties: {
      id: this.id * 1
    }
  }
}

Location.prototype.uploadFeature = async function() {
  // const key = await axios.post("https://api.mapbox.com/datasets/v1/mstykmshy?access_token=sk.eyJ1IjoibXN0eWttc2h5IiwiYSI6ImNrYWVqOWh0cTBmaGcycnBuNWZrY3pjaWYifQ.1r2Lo_6X3SFqrKc5ayOp3g", {"features": {"type": "FeatureCollection",
  // "features":
  // [{"type":"Feature","geometry":{"type":"Point","coordinates":[-73.8648,40.8448]},"properties":{"id":1}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-73.92262,40.70673]},"properties":{"id":2}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-73.929549,40.69406]},"properties":{"id":3}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-73.933512,40.705998]},"properties":{"id":4}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-73.910625,40.683237]},"properties":{"id":5}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-73.984869,40.759314]},"properties":{"id":6}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-74.010754,40.708942]},"properties":{"id":7}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-73.931796,40.707847]},"properties":{"id":8}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-73.941267,40.802336]},"properties":{"id":9}}]
  // }})
  // console.log(key)
  await axios.put(
    'https://api.mapbox.com/datasets/v1/mstykmshy/{dataset_id}/features/{feature_id}?access_token=sk.eyJ1IjoibXN0eWttc2h5IiwiYSI6ImNrYWVqOWh0cTBmaGcycnBuNWZrY3pjaWYifQ.1r2Lo_6X3SFqrKc5ayOp3g',
    {}
  )
}

module.exports = Location
