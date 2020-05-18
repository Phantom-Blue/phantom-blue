import React from 'react'
import {connect} from 'react-redux'
import {fetchLocationArtwork} from '../../store/artworks'
import ArtworkOptions from './ArtworkOptions'
import {generateUrl} from './utils'
import Popup from 'reactjs-popup'
import './artwork.css'
import SingleArtwork from './SingleArtwork'
import {Link} from 'react-router-dom'
import LocationArtwork from './LocationArtwork'
import './artwork.css'
import Loading from '../Loading'

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
          <div className="map-popup-content">
            <Link to={`/artwork/${this.props.artworks[0].id}`}>
              <img
                src={this.props.artworks[0].imageUrl[0]}
                alt={this.props.artworks[0].artist}
                id="map-popup-img"
              />
              <h3 id="artistname">{this.props.artworks[0].artist}</h3>
            </Link>
            <Link
              id="all-art-at-location"
              to={`/location/${this.props.artworks[0].LocationId}`}
            >
              View all art at this location
            </Link>
          </div>
        ) : (
          <Loading />
        )}
        <div id="google-nav-btn">
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
            TAKE ME THERE
          </a>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  artworks: state.artwork.selected
})

const mapDispatch = dispatch => ({
  getArtwork: (lat, long) => dispatch(fetchLocationArtwork(lat, long))
})

export default connect(mapState, mapDispatch)(Artwork)
