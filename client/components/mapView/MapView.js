import React, {useState} from 'react'
import ReactMapGl, {Marker, Popup} from 'react-map-gl'
import * as data from '../data/data.json'
// need to import css file here
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

  const [selectedState, setSelectedState] = useState(null)

  return (
    <div>
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
            onClose={() => {
              setSelectedState(null)
            }}
          >
            <h2>{selectedState.city}</h2>
          </Popup>
        ) : null}
      </ReactMapGl>
    </div>
  )
}

export default MapView
