import React, {useState, useEffect} from 'react'
import ReactMapGl, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl
} from 'react-map-gl'
import * as data from '../data/data.json'
import '../../../secrets'

export const MapView = () => {
  const [viewport, setViewport] = useState({
    latitute: 40.7128,
    longitude: -74.006,
    width: '100vw',
    height: '100vh',
    zoom: 4
  })

  const [selectedState, setSeletedState] = useState(null)

  return (
    <div>
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport => {
          setViewport(viewport)
        }}
      />
    </div>
  )
}

export default MapView
