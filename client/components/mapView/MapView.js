/* eslint-disable react/no-access-state-in-setstate */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllArtworks} from '../../store/artworks'
import ReactMapGl, {
  Marker,
  NavigationControl,
  FullscreenControl
} from 'react-map-gl'
import Popup from 'reactjs-popup'
// customize popup style
import {desktopContentStyle, mobileContentStyle} from './popupStyle.js'
import Artwork from '../artwork/Artwork'
import '../../../secrets'
import './mapView.css'
import MapPin from './MapPin'
// VIEW AS A LIST POPUP
import ArtistListPopup from '../popups/artistListPopup'

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
      selectedPin: null,
      open: false
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    this.props.getAllArtWorks()
    this.setState({
      viewport: {
        latitude: this.props.location.latitude,
        longitude: this.props.location.longitude,
        width: '100vw',
        height: '100vh',
        zoom: 12
      }
    })
  }

  openModal() {
    this.setState({open: true})
  }
  closeModal() {
    this.setState({open: false})
  }

  render() {
    const {theArtworks} = this.props
    const {innerWidth} = window

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
                      this.openModal()
                    }}
                  >
                    <MapPin />
                  </button>
                </Marker>
              ))
            : ''}
          {/** CONDITIONS TO DISPLAY POP UP ON MOBILE AND DESKTOP */}
          {this.state.selectedPin ? (
            <div>
              <Popup
                className="popup-contaner"
                open={this.state.open}
                closeOnDocumentClick
                latitude={Number(this.state.selectedPin.latitude)}
                longitude={Number(this.state.selectedPin.longitude)}
                // CUSTOMIZE STYLING BASE ON REACT_MAP_GL DOC
                contentStyle={
                  innerWidth < 768 ? mobileContentStyle : desktopContentStyle
                }
                onClose={() => {
                  this.setState({selectedPin: null})
                  this.closeModal()
                }}
              >
                <div>
                  <button
                    type="button"
                    className="close-btn"
                    onClick={() => this.closeModal()}
                  >
                    {' '}
                    &times;
                  </button>
                  {/** INDIVIDUAL ARTWORK FOR EACH PIN BY LOCATION*/}
                  <Artwork
                    latitude={Number(this.state.selectedPin.latitude)}
                    longitude={Number(this.state.selectedPin.longitude)}
                    address={this.state.selectedPin.address}
                  />
                </div>
              </Popup>
            </div>
          ) : (
            ''
          )}
          {/** CONDITIONS FOR LOADING NAV CONTROLS BASE ON DEVICE */}
          {innerWidth > 768 ||
          (innerWidth < 768 && this.state.selectedPin === null) ? (
            <div>
              <div id="navegation-control">
                <NavigationControl />
              </div>
              <div id="fullscreen-control">
                <FullscreenControl />
              </div>
            </div>
          ) : (
            ''
          )}
        </ReactMapGl>
        {/** BELOW IS POPUP FOR DISPLAY OF ALL ARTWORK */}
        <ArtistListPopup />
      </div>
    )
  }
}

const mapState = state => ({
  theArtworks: state.artwork.all,
  location: state.location
})

const mapDispatch = dispatch => ({
  getAllArtWorks: () => dispatch(fetchAllArtworks())
})

export default connect(mapState, mapDispatch)(MapView)
