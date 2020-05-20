/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable complexity */
/* eslint-disable react/no-access-state-in-setstate */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllArtworks, fetchArtFromMyLocation} from '../../store/artworks'
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
import {getLSLocation, setLSLocation} from '../utils/utils'
import Loading from '../utils/Loading'
// import ls from 'local-storage'

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
      open: false,
      artworks: []
    }
    this.popupContainer = React.createRef()
    this.handleClose = this.handleClose.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.lodArtIntoState = this.lodArtIntoState.bind(this)
  }

  async componentDidMount() {
    const lSLocation = getLSLocation()

    if (this.props.artToMapFromMain[0]) {
      const {userLocation} = this.props
      // this.props.getMyLocationArt(userLocation)
      this.setState({
        viewport: {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude
        }
      })
      setLSLocation(userLocation)
    } else if (
      lSLocation.latitude !== undefined &&
      lSLocation.latitude !== null
    ) {
      console.log('lSLocation.latitude', lSLocation.latitude)
      await this.props.getMyLocationArt(lSLocation)
      this.setState({
        viewport: {
          latitude: lSLocation.latitude,
          longitude: lSLocation.longitude
        }
      })
    } else {
      await this.props.getAllArtWorks()
      console.log('ALL ARTWORKS IN CDM', this.props.allArtworks)
      this.setState({
        viewport: {
          latitude: this.props.location.latitude,
          longitude: this.props.location.longitude
        }
      })
    }
    this.lodArtIntoState()
  }

  lodArtIntoState() {
    if (this.props.artToMapFromMain[0] !== undefined) {
      this.setState({
        artworks: this.props.artToMapFromMain
      })
    } else if (this.props.artNearMe[0] !== undefined) {
      this.setState({
        artworks: this.props.artNearMe
      })
    } else if (this.props.allArtworks[0] !== undefined) {
      this.setState({
        artworks: this.props.allArtworks
      })
    }
  }

  handleClose() {
    this.popupContainer.style.width = '0vw'
  }
  openModal() {
    this.setState({open: true})
  }
  closeModal() {
    this.setState({open: false})
  }

  render() {
    const {innerWidth} = window
    const {allArtworks, artNearMe} = this.props

    return this.state.artworks[0] ? (
      <div className="map-container">
        <ReactMapGl
          {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
          mapStyle="mapbox://styles/gisellez/ck9yorghb2d811ipjrtgocomz"
          onViewportChange={newport => {
            this.setState({viewport: newport})
          }}
        >
          {this.state.artworks[0]
            ? this.state.artworks.map(artwork => (
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
            : this.props.allArtworks.map(artwork => (
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
              ))}
          {/** CONDITIONS TO DISPLAY POP UP ON MOBILE AND DESKTOP */}
          {this.state.selectedPin ? (
            <div>
              <Popup
                className="popup-contaner"
                open={this.state.open}
                closeOnDocumentClick
                latitude={Number(this.state.selectedPin.latitude)}
                longitude={Number(this.state.selectedPin.longitude)}
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
        {/* <ArtistListPopup /> */}
      </div>
    ) : (
      <Loading />
    )
  }
}

// MapView.getInitialProps = async function() {}

const mapState = state => ({
  allArtworks: state.artwork.all,
  artNearMe: state.artwork.artNearMe,
  location: state.location
})

const mapDispatch = dispatch => ({
  getAllArtWorks: () => dispatch(fetchAllArtworks()),
  getMyLocationArt: location => dispatch(fetchArtFromMyLocation(location))
})

export default connect(mapState, mapDispatch)(MapView)
