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
import Geocoder from 'react-map-gl-geocoder'
import Popup from 'reactjs-popup'
// customize popup style
import {desktopContentStyle, mobileContentStyle} from './popupStyle.js'
import Artwork from '../artwork/Artwork'
import '../../../secrets'
import './mapView.css'
// import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import MapPin from './MapPin'
// VIEW AS A LIST POPUP
import ArtistListPopup from '../popups/artistListPopup'
import {getLSLocation, setLSLocation} from '../utils/utils'
// import {Loading, getAccessToken} from '../utils'

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
    this.handleNewSearch = this.handleNewSearch.bind(this)
  }

  async componentDidMount() {
    const lSLocation = getLSLocation()

    if (this.props.artToMapFromMain) {
      const {userLocation} = this.props
      // this.props.getMyLocationArt(userLocation)
      this.setState({
        viewport: {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          width: '100vw',
          height: '100vh',
          zoom: 13
        },
        artworks: this.props.artToMapFromMain
      })
      setLSLocation(userLocation)
    } else if (
      lSLocation.latitude !== undefined &&
      lSLocation.latitude !== null
    ) {
      try {
        await this.props.getMyLocationArt(lSLocation)
        this.setState({
          viewport: {
            latitude: lSLocation.latitude,
            longitude: lSLocation.longitude,
            width: '100vw',
            height: '100vh',
            zoom: 13
          },
          artworks: this.props.artNearMe
        })
      } catch (error) {
        console.error('could not retrieve all artworks')
      }
    } else {
      try {
        await this.props.getAllArtWorks()
      } catch (error) {
        console.error('could not retrieve all artworks')
      }
      this.setState({
        viewport: {
          latitude: this.props.location.latitude,
          longitude: this.props.location.longitude,
          width: '100vw',
          height: '100vh',
          zoom: 12
        },
        artworks: this.props.allArtworks
      })
    }
  }

  mapRef = React.createRef()

  handleViewportChange = viewport => {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    })
  }

  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = {transitionDuration: 1000}

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }

  async handleNewSearch(result) {
    const newLocation = {
      latitude: result.result.center[1],
      longitude: result.result.center[0]
    }
    try {
      await this.props.getMyLocationArt(newLocation)
    } catch (error) {
      console.error('could not retrieve all artworks')
    }
    this.setState({
      viewport: {
        latitude: newLocation.latitude,
        longitude: newLocation.longitude,
        width: '100vw',
        height: '100vh',
        zoom: 13
      },
      artworks: this.props.artNearMe
    })
    this.handleGeocoderViewportChange(this.state.viewport)
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
    console.log(this.props)

    return (
      <div className="map-container">
        <ReactMapGl
          ref={this.mapRef}
          {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
          mapStyle="mapbox://styles/gisellez/ckad1bysz015w1invk5uwl47i"
          onViewportChange={newport => {
            this.setState({viewport: newport})
          }}
        >
          <Geocoder
            mapRef={this.mapRef}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
            onViewportChange={this.handleGeocoderViewportChange}
            position="top-right"
            onResult={result => this.handleNewSearch(result)}
            zoom={12}
          />

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
        <ArtistListPopup />
      </div>
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
