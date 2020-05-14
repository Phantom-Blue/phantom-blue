import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllArtworks} from '../../store/artworks'
import ReactMapGl, {Marker, Popup} from 'react-map-gl'
import ArtworksPopup from 'reactjs-popup'
import {Link} from 'react-router-dom'
// import * as data from '../data/data.json'
import Artwork from '../artwork/Artwork'
import AllArtworks from '../allArtworks/AllArtworks'
import '../../../secrets'
import './mapView.css'

const markerBtn = {
  background: 'none',
  border: 'none'
}

class MapView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        latitude: 40.7736,
        longitude: -73.9566,
        width: '100vw',
        height: '100vh',
        zoom: 13
      },
      selectedPin: null
    }
  }

  componentDidMount() {
    this.props.getAllArtWorks()
  }

  render() {
    const {theArtworks} = this.props
    // console.log('All Art', theArtworks)
    return (
      <div className="map-container">
        <ReactMapGl
          {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
          mapStyle="mapbox://styles/gisellez/ck9yorghb2d811ipjrtgocomz"
          onViewportChange={newport => {
            this.setState(newport)
          }}
        >
          {theArtworks
            ? theArtworks.map(artwork => (
                <Marker
                  key={artwork.id}
                  latitude={Number(artwork.Location.latitude)}
                  longitude={Number(artwork.Location.longitude)}
                >
                  <button
                    type="button"
                    style={markerBtn}
                    onClick={ev => {
                      ev.preventDefault()
                      this.setState(artwork)
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
              ))
            : 'No Art Here -_-'}
          {this.state.selectedPin ? (
            <Popup
              className="popup-container"
              latitude={this.state.selectedPin.latitude}
              longitude={this.state.selectedPin.longitude}
              closeOnClick={false}
              onClose={() => {
                this.setState(null)
              }}
            >
              <Artwork
                latitude={Number(this.state.selectedPin.latitude)}
                longitude={Number(this.state.selectedPin.longitude)}
              />
            </Popup>
          ) : null}
        </ReactMapGl>
        <div className="artwork-list-outer-container">
          {/** BELOW IS POPUP FOR DISPLAY OF ALL ARTWORK */}
          <ArtworksPopup
            position="top left"
            trigger={
              <div className="see-all-artworks-link-container">
                <Link id="link-to-all-artworks">View as list</Link>
              </div>
            }
            modal
            closeOnDocumentClick
          >
            {close => (
              <div className="modal">
                <a className="close" onClick={close}>
                  &times;
                </a>
                <div className="content">
                  <AllArtworks />
                </div>
              </div>
            )}
          </ArtworksPopup>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    theArtworks: state.artwork
  }
}

const mapDispatch = dispatch => ({
  getAllArtWorks: () => dispatch(fetchAllArtworks())
})

export default connect(mapState, mapDispatch)(MapView)
