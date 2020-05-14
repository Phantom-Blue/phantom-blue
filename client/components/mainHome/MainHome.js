/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
import React from 'react'
import {connect} from 'react-redux'
import {fetchAllVerified} from '../../store/artworks'
import {generateUrl} from '../artwork/utils'
import './mainHome.css'
import {Link} from 'react-router-dom'

class MainHome extends React.Component {
  componentDidMount() {
    this.props.getVerifiedArtwork()
  }

  render() {
    const {artworks} = this.props
    console.log(this.props.artworks[0], 'INSIDE MAIN HOME RENDERRRRRRRRR')
    let directionsUrl
    return (
      <div>
        {this.props.artworks[0] ? (
          this.props.artworks.map(artwork => (
            <div key={artwork.id}>
              <div>{console.log(artwork.id)}</div>
              <h1> IT LOADS </h1>
              <img src={artwork.imageUrl[0]} />
              <Link to={`/artwork/${this.props.match.params.id}`}>
                <button type="button">
                  <p>{artwork.description}</p>
                </button>
              </Link>
              {(directionsUrl = generateUrl(artwork.Location.address))}
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                <h4>TAKE ME THERE</h4>
              </a>
            </div>
          ))
        ) : (
          <center>
            <h2>L O A D I N G . . .</h2>
            <img
              src="http://gisellezatonyl.com/images/blobbers-03-newalgos-12-23-13-02-lessframes-600pxw.gif"
              width="300"
            />
          </center>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  artworks: state.artwork.verified
})

const mapDispatch = dispatch => ({
  getVerifiedArtwork: () => dispatch(fetchAllVerified())
})

export default connect(mapState, mapDispatch)(MainHome)
