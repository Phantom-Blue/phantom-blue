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

class ArtByLoctionMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        width: '100vw',
        height: '100vh',
        zoom: 15
      },
      selectedPin: null,
      selectedPinLat: 0,
      selectedPinLong: 0,
      selectedPinAdd: ''
    }
  }

  // componentDidMount(){
  //   const {latitude, longitude, artworks} = this.props
  //   localStorage.
  // }

  render() {
    console.log('SELECTED PIN IN ART BY LOCATION MAP', this.state.selectedPin)
    // const {locationArtworks} = this.props
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
                        selectedPinAdd: artwork.Location.address
                      })
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
          {console.log(this.state.selectedPin)}
          {this.state.selectedPinLat !== null ? (
            <Popup
              className="popup-container"
              latitude={Number(this.state.selectedPinLat)}
              longitude={Number(this.state.selectedPinLong)}
              closeOnClick={false}
              onClose={() => {
                this.setState({selectedPin: null})
              }}
            >
              <Artwork
                latitude={Number(this.state.selectedPinLat)}
                longitude={Number(this.state.selectedPinLong)}
                address={this.state.selectedPinAdd}
              />
            </Popup>
          ) : (
            'THE PIN IS NULLLLLLLLLL'
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

// const mapState = state => ({
//   locationArtworks: state.artwork.selected
// })

// const mapDispatch = dispatch => ({
//   getMyLocationArt: location => dispatch(fetchArtFromMyLocation(location))
// })

export default connect(null, null)(ArtByLoctionMap)
