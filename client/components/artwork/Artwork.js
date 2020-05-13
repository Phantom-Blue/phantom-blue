import React from 'react'
var ReactDOM = require('react-dom')
var Carousel = require('react-responsive-carousel').Carousel
import {connect} from 'react-redux'
import {fetchArtwork} from '../../store/artworks'
// import Dropdown from 'react-dropdown'
// import { Link } from 'react-router-dom'
import ArtworkOptions from './ArtworkOptions'
import {generateUrl} from './utils'

class Artwork extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: false,
      directions: ''
    }
    this.handleOptions = this.handleOptions.bind(this)
  }

  componentDidMount() {
    const {latitude, longitude, getArtwork} = this.props
    // const latLonLocation = {latitude, longitude}
    // console.log(latLonLocation, ' INSIDE ARTWORK COMPONENT')
    getArtwork(latitude, longitude)
  }

  handleOptions() {
    const {options} = this.state
    this.setState({
      options: !options
    })
  }

  render() {
    const {latitude, longitude, artworks} = this.props
    const {options} = this.state
    // console.log(latitude, ' IN ARTWORK RENDER')
    console.log(this.props, 'insie artworks render')
    // const location = latitude.concat(' ', longitude)

    const directionsUrl = generateUrl(latitude, longitude)

    return (
      <div>
        {/* <div className="artwork">
          <div className="image">
          <Carousel showArrows={true}>
            {// HERE WE INCOORPORATE A CAROUSEL //
            this.props.artworks ? (
              artworks.map(artwork => (
                <div key={artwork.id}>
                  <img src={artwork.imageUrl} alt={artwork.artist} />
                  <div className="artworkoptions">
                    <h1 className="artistname">{artwork.artist}</h1>
                    <button
                      type="button"
                      className="historybutton"
                      onClick={this.handleOptions}
                    >
                      <img
                        src="http://www.gisellezatonyl.com/WRONGSmall/Assets/Images/arrowD.png"
                        alt="down button"
                      />
                    </button>
                    <div>
                      {options === true ? (
                        <ArtworkOptions artwork={artwork} />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : ('Loading...')
            }
            </Carousel>
            <div>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                <h4>TAKE ME THERE</h4>
              </a>
            </div>
          </div>
        </div> */}
      </div>
    )
  }
}

const mapState = state => ({
  artworks: state.artwork
})

const mapDispatch = dispatch => ({
  getArtwork: (lat, long) => dispatch(fetchArtwork(lat, long))
})

export default connect(mapState, mapDispatch)(Artwork)
