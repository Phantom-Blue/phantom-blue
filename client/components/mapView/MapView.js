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
import {
  desktopContentStyle,
  mobileContentStyle,
  mobileAllArtworksStyle
} from './popupStyle.js'
import {Link} from 'react-router-dom'
import Artwork from '../artwork/Artwork'
import AllArtworks from '../allArtworks/AllArtworks'
import '../../../secrets'
import './mapView.css'
import MapPin from './MapPin'

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
    this.popupContainer = React.createRef()
    this.handleClose = this.handleClose.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    this.props.getAllArtWorks()
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
    const {theArtworks} = this.props
    const {innerWidth} = window
    console.log(theArtworks)
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

const mapState = state => ({
  theArtworks: state.artwork.all
})

const mapDispatch = dispatch => ({
  getAllArtWorks: () => dispatch(fetchAllArtworks())
})

export default connect(mapState, mapDispatch)(MapView)
