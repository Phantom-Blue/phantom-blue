import React from 'react'
import {connect} from 'react-redux'
import {fetchArtwork} from '../../store/artwork'
import Dropdown from 'react-dropdown'
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
    const latLonLocation = {latitude, longitude}
    getArtwork(latLonLocation)
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

    const location = latitude.concat(' ', longitude)

    const directionsUrl = generateUrl(location)

    return (
      <div>
        <div className="artwork">
          <div className="image">
            <button type="submit" className="historybutton">
              <img
                src="http://www.gisellezatonyl.com/WRONGSmall/Assets/Images/arrowL.png"
                alt="back button"
              />
            </button>
            <button type="submit" className="historybutton">
              <img
                src="http://www.gisellezatonyl.com/WRONGSmall/Assets/Images/arrowR.png"
                alt="forward button"
              />
            </button>
            {// HERE WE INCOORPORATE A CAROUSEL //
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
            ))}
            <div>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                <h4>TAKE ME THERE</h4>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  artworks: state.artworks
})

const mapDispatch = dispatch => ({
  getArtwork: location => dispatch(fetchArtwork(location))
})

export default connect(mapState, mapDispatch)(Artwork)
