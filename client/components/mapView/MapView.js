import React, {useState} from 'react'
import ReactMapGl, {Marker, Popup} from 'react-map-gl'
import {Link} from 'react-router-dom'
import * as data from '../data/data.json'
import Artwork from '../artwork/Artwork'
import '../../../secrets'
import './mapView.css'
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

  const [selectedState, setSelectedState] = useState(null)

  return (
    <div className="map-container">
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        mapStyle="mapbox://styles/gisellez/ck9yorghb2d811ipjrtgocomz"
        onViewportChange={newport => {
          setViewport(newport)
        }}
      >
        {data.newYorkCities.map(borough => (
          <Marker
            key={borough.id}
            latitude={borough.latitude}
            longitude={borough.longitude}
          >
            <button
              type="button"
              style={markerBtn}
              onClick={ev => {
                ev.preventDefault()
                setSelectedState(borough)
              }}
            >
              <img
                width="50px"
                height="50px"
                src="/location-pin.png"
                alt="city"
              />
            </button>
          </Marker>
        ))}
        {selectedState ? (
          <Popup
            className="popup-container"
            latitude={selectedState.latitude}
            longitude={selectedState.longitude}
            closeOnClick={false}
            onClose={() => {
              setSelectedState(null)
            }}
          >
            <Artwork
              latitude={selectedState.latitude}
              longitude={selectedState.longitude}
            />
          </Popup>
        ) : null}
        <div className="see-all-artworks-link-container">
          <Link id="link-to-all-artworks" to="/allartworks">
            {' '}
            View as list
          </Link>
        </div>
      </ReactMapGl>
    </div>
  )
}

export default MapView
