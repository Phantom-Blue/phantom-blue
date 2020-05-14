import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllArtworks} from '../../store/artworks'
import ReactMapGl, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl
} from 'react-map-gl'
import ArtworksPopup from 'reactjs-popup'
import {Link} from 'react-router-dom'
import Artwork from '../artwork/Artwork'
import AllArtworks from '../allArtworks/AllArtworks'
import '../../../secrets'
import './mapView.css'

class MapView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        latitude: 40.7736,
        longitude: -73.9566,
        width: '100vw',
        height: '100vh',
        zoom: 12
      },
      selectedPin: null
    }
  }

  componentDidMount() {
    this.props.getArtWorksss()
  }

  render() {
    const {theArtworks} = this.props

    return (
      <div className="map-container">
        <ReactMapGl
          {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
          mapStyle="mapbox://styles/gisellez/ck9yorghb2d811ipjrtgocomz"
          onViewportChange={newport => {
            this.setState({viewport: newport})
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
                    id="marker-pin"
                    onClick={ev => {
                      ev.preventDefault()
                      this.setState({selectedPin: artwork.Location})
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
            : ''}
          {this.state.selectedPin ? (
            <Popup
              className="popup-container"
              latitude={Number(this.state.selectedPin.latitude)}
              longitude={Number(this.state.selectedPin.longitude)}
              closeOnClick={false}
              onClose={() => {
                this.setState({selectedPin: null})
              }}
            >
              <Artwork
                latitude={Number(this.state.selectedPin.latitude)}
                longitude={Number(this.state.selectedPin.longitude)}
                address={this.state.selectedPin.address}
              />
            </Popup>
          ) : (
            ''
          )}
          <div id="navegation-control">
            <NavigationControl />
          </div>
          <div id="fullscreen-control">
            <FullscreenControl />
          </div>
        </ReactMapGl>
        {/** BELOW IS POPUP FOR DISPLAY OF ALL ARTWORK */}
        <div className="artwork-list-outer-container">
          <ArtworksPopup
            trigger={
              <div className="see-all-artworks-link-container">
                <Link to="/" id="link-to-all-artworks">
                  View as list
                </Link>
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

const mapState = state => ({
  theArtworks: state.artwork.all
})

const mapDispatch = dispatch => ({
  getArtWorksss: () => dispatch(fetchAllArtworks())
})

export default connect(mapState, mapDispatch)(MapView)
