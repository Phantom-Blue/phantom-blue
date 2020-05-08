import React, {useState, useEffect} from 'react'
import ReactMapGl, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl
} from 'react-map-gl'
import * as data from '../data/data.json'
import '../../../secrets'

const markerBtn = {
  background: 'none',
  border: 'none'
}

export const MapView = () => {
  const [viewport, setViewport] = useState({
    latitude: 40.7736,
    longitude: -73.9566,
    width: '100vw',
    height: '100vh',
    zoom: 13
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
      >
        {data.newYorkCities.map((borough, idx) => {
          return (
            <Marker
              key={idx}
              latitude={borough.latitude}
              longitude={borough.longitude}
            >
              <button
                style={markerBtn}
                onClick={e => {
                  e.preventDefault()
                  setSeletedState(borough)
                }}
              >
                <img
                  width="50px"
                  height="50px"
                  src="./location-pin.png"
                  alt="city"
                />
              </button>
            </Marker>
          )
        })}
      </ReactMapGl>
    </div>
  )
}

export default MapView
