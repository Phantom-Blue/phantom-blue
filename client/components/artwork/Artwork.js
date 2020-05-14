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
      <div id="carousel">
        {// HERE WE INCOORPORATE A CAROUSEL //
        this.props.artworks[0] ? (
          <div>
            <Link to={`/artwork/${this.props.artworks[0].id}`}>
              <img
                src={this.props.artworks[0].imageUrl[0]}
                alt={this.props.artworks[0].artist}
                width="200"
              />
              <h3 className="artistname">{this.props.artworks[0].artist}</h3>
            </Link>
            <Link to={`/location/${this.props.artworks[0].LocationId}`}>
              <p>V I E W A L L A R T A T T H I S L O C A T I O N</p>
            </Link>
          </div>
        ) : (
          <div>
            <center>
              <h2>L O A D I N G . . .</h2>
              <img
                src="http://gisellezatonyl.com/images/blobbers-03-newalgos-12-23-13-02-lessframes-600pxw.gif"
                width="300"
              />
            </center>
          </div>
        )}
        <div>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
            <h4>TAKE ME THERE</h4>
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
