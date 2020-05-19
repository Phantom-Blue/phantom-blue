import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactMapGl, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl
} from 'react-map-gl'
// import {fetchArtFromMyLocation} from '../../store/artworks'
import ArtworksPopup from 'reactjs-popup'
import {Link} from 'react-router-dom'
import Artwork from '../artwork/Artwork'
import AllArtworks from '../allArtworks/AllArtworks'
import '../../../secrets'
import './mapView.css'
import ls from 'local-storage'
import MapPin from './MapPin'
import {
  desktopContentStyle,
  mobileContentStyle,
  mobileAllArtworksStyle
} from './popupStyle.js'

class ArtByLoctionMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        width: '100vw',
        height: '100vh',
        zoom: 14
      },
      selectedPin: null,
      selectedPinLat: 0,
      selectedPinLong: 0,
      selectedPinAdd: '',
      open: false
    }
    this.popupContainer = React.createRef()
    this.handleClose = this.handleClose.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
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
    console.log(this.props)
    const {innerWidth} = window
    return (
      <div className="map-container">
        <ReactMapGl
          {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
          mapStyle="mapbox://styles/gisellez/ckad1bysz015w1invk5uwl47i"
          onViewportChange={newport => {
            this.setState({viewport: newport})
          }}
        >
          {this.props.artworks[0]
            ? this.props.artworks.map(artwork => (
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
                      this.setState({
                        selectedPinLat: artwork.Location.latitude,
                        selectedPinLong: artwork.Location.longitude,
                        selectedPinAdd: artwork.Location.address,
                        selectedPin: artwork.Location
                      })
                      this.openModal()
                    }}
                  >
                    <MapPin />
                  </button>
                </Marker>
              ))
            : ''}
          {this.state.selectedPinLat !== null ? (
            <Popup
              className="popup-contaner"
              open={this.state.open}
              closeOnDocumentClick
              latitude={Number(this.state.selectedPinLat)}
              longitude={Number(this.state.selectedPinLong)}
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
                  latitude={Number(this.state.selectedPinLat)}
                  longitude={Number(this.state.selectedPinLong)}
                  address={this.state.selectedPinAdd}
                />
              </div>
            </Popup>
          ) : (
            ''
          )}
          {innerWidth > 768 ? (
            <div>
              <div id="navegation-control">
                <NavigationControl />
              </div>
              <div id="fullscreen-control">
                <FullscreenControl />
              </div>
            </div>
          ) : innerWidth < 768 && this.state.selectedPin === null ? (
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
        <div className="artwork-list-outer-container">
          <Popup
            trigger={
              <div className="see-all-artworks-link-container">
                <Link to="/map" id="link-to-all-artworks">
                  View as list
                </Link>
              </div>
            }
            modal
            closeOnDocumentClick
            contentStyle={innerWidth < 768 ? mobileAllArtworksStyle : ''}
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
          </Popup>
        </div>
      </div>
    )
  }
}

// const mapState = state => ({
//   locationArtworks: state.artwork.selected
// })

// const mapDispatch = dispatch => ({
//   getMyLocationArt: location => dispatch(fetchArtFromMyLocation(location))
// })

export default connect(null, null)(ArtByLoctionMap)
