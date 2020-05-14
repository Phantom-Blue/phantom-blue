import React from 'react'
import {connect} from 'react-redux'
import {fetchLocationArtwork} from '../../store/artworks'
import ArtworkOptions from './ArtworkOptions'
// import {generateUrl} from './utils'
import Popup from 'reactjs-popup'
import './artwork.css'
import SingleArtwork from './SingleArtwork'
import {Link} from 'react-router-dom'

class Artwork extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      directions: ''
    }
  }

  componentDidMount() {
    const {latitude, longitude, getArtwork} = this.props
    getArtwork(latitude, longitude)
  }

  render() {
    // const {artworks} = this.props
    console.log('SINGLE ARTWORK', this.props)
    // console.log('inside artwork', this.props)
    // console.log(options)
    // const directionsUrl = generateUrl(artworks[0])

    return (
      <div>
        <div className="artwork">
          <div id="carousel">
            {// HERE WE INCOORPORATE A CAROUSEL //
            this.props.artworks[0]
              ? this.props.artworks.map(artwork => (
                  <Link
                    to={`/artwork/${artwork.id}`}
                    // artwork={artwork}
                    key={artwork.id}
                  >
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.artist}
                      width="200"
                    />
                    <h5 className="artistname">{artwork.artist}</h5>
                  </Link>

                  // <SingleArtwork
                  //   className="carousel-image"
                  //   key={artwork.id}
                  //   artwork={artwork} />
                ))
              : 'Loading...'}
            <div>
              {/* CRAFT NEW UTIL FUNC THAT TRANSFORMS LAT LONG INTO DIRECTIONS LINK */}
              {/* <a href={directionsUrl} target="_blank" rel="noopener noreferrer"> */}
              {/* <h4>TAKE ME THERE</h4> */}
              {/* </a> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  artworks: state.artwork.all
})

const mapDispatch = dispatch => ({
  getArtwork: (lat, long) => dispatch(fetchLocationArtwork(lat, long))
})

export default connect(mapState, mapDispatch)(Artwork)
