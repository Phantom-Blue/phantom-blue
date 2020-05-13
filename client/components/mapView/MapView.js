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

export class MapView extends Component {
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
    const {allArtWorks} = this.props || []
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
          {allArtWorks
            ? allArtWorks.map(artwork => (
                <Marker
                  key={artwork.id}
                  latitude={artwork.location.latitude}
                  longitude={artwork.location.longitude}
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
                latitude={this.state.selectedPin.latitude}
                longitude={this.state.selectedPin.longitude}
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
    allArtWorks: state.artwork
  }
}

const mapDispatch = dispatch => ({
  getAllArtWorks: () => dispatch(fetchAllArtworks())
})

export default connect(mapState, mapDispatch)(MapView)

// class Map extends Component {
//   state = {
//     viewport: {
//       width: 400,
//       height: 400,
//       latitude: 37.7577,
//       longitude: -122.4376,
//       zoom: 8
//     }
//   };
//   render() {
//     return (
//       <ReactMapGL
//         {...this.state.viewport}
//         onViewportChange={(viewport) => this.setState({viewport})}
//       />
//     );
//   }
// }
