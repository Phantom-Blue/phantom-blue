/* eslint-disable no-unused-vars */
import React from 'react'
import {connect} from 'react-redux'
import {fetchLocationArtwork} from '../../store/artworks'
// import ArtworkOptions from './ArtworkOptions'
import {generateUrl} from '../utils/utils'
import Popup from 'reactjs-popup'
// import SingleArtwork from './SingleArtwork'
import {Link} from 'react-router-dom'
// import LocationArtwork from './LocationArtwork'
import Loading from '../utils/Loading'
import './style/artwork.css'

class Artwork extends React.Component {
  componentDidMount() {
    console.log('IN COMPONENT DID MOUNT', this.props)
    const {latitude, longitude, getArtwork} = this.props
    getArtwork(latitude, longitude)
  }

  render() {
    const {address} = this.props
    const directionsUrl = generateUrl(address)

    return (
      <div id="map-popup-container">
        {// HERE WE INCOORPORATE A CAROUSEL //
        this.props.artworks[0] ? (
          <div id="map-popup-content">
            <div>
              <Link to={`/artwork/${this.props.artworks[0].id}`}>
                <img
                  src={this.props.artworks[0].imageUrl[0]}
                  alt={this.props.artworks[0].artist}
                  className="map-popup-img"
                />
                <h2 className="artist-name">{this.props.artworks[0].artist}</h2>
              </Link>
              <p className="art-address">{this.props.address}</p>
              <div className="google-nav-btn">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TAKE ME THERE
                </a>
              </div>
              <Link
                className="all-art-at-location"
                to={`/location/${this.props.artworks[0].LocationId}`}
              >
                View all art at this location
              </Link>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}

const mapState = state => ({
  artworks: state.artwork.artByLocation
})

const mapDispatch = dispatch => ({
  getArtwork: (lat, long) => dispatch(fetchLocationArtwork(lat, long))
})

export default connect(mapState, mapDispatch)(Artwork)
