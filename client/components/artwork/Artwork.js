import React from 'react'
import {connect} from 'react-redux'
import {fetchArtwork} from '../../store/artworks'
// import Dropdown from 'react-dropdown'
// import { Link } from 'react-router-dom'
import ArtworkOptions from './ArtworkOptions'
// import {generateUrl} from './utils'
import Popup from 'reactjs-popup'

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
    console.log('inside artwork', this.props)
    // console.log(options)
    // const directionsUrl = generateUrl(artworks[0])

    return (
      <div>
        <div className="artwork">
          <div className="image">
            {// HERE WE INCOORPORATE A CAROUSEL //
            this.props.artworks[0]
              ? this.props.artworks.map(artwork => (
                  <div key={artwork.id}>
                    <img src={artwork.imageUrl} alt={artwork.artist} />
                    <div className="artworkoptions">
                      <h1 className="artistname">{artwork.artist}</h1>
                      <div>
                        {/* <Popup
                          trigger={
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
                          }
                          position="right center"
                        >
                          {/* {options === true ? (
                            <ArtworkOptions artwork={artwork} />
                          ) : (
                            ''
                          )} */}
                        {/* </Popup> */}
                      </div>
                    </div>
                  </div>
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
  artworks: state.artwork
})

const mapDispatch = dispatch => ({
  getArtwork: (lat, long) => dispatch(fetchArtwork(lat, long))
})

export default connect(mapState, mapDispatch)(Artwork)
