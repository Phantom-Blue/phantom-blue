import React from 'react'

class Geocoder extends React.Component {
  componentDidMount() {
    map.on('load', function() {
      var geocoder = new MapboxGeocoder({
        // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        zoom: 13, // Set the zoom level for geocoding results
        placeholder: 'Enter an address or place name', // This placeholder text will display in the search bar
        bbox: [-105.116, 39.679, -104.898, 39.837] // Set a bounding box
      })
      // Add the geocoder to the map
      map.addControl(geocoder, 'top-left') // Add the search box to the top left
    })
  }
  Render() {}
}
