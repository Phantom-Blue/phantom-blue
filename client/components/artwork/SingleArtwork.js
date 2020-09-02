/* eslint-disable react/no-array-index-key */
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ArtworkOptions from './ArtworkOptions'
import {fetchOneArtwork} from '../../store/artworks'
import {addFavoriteArtwork} from '../../store/user'
import Loading from '../utils/Loading'
import BackButton from '../utils/BackButton'
import './style/singleArtwork.css'

class SingleArtwork extends React.Component {
  componentDidMount() {
    this.props.getOneArtwork(this.props.match.params.id)
  }

  render() {
    const {artwork, addToFavorites} = this.props
    return (
      <div className="single-artwork-container">
        {this.props.artwork ? (
          <div className="single-artwork-details">
            {artwork.imageUrl ? (
              artwork.imageUrl.map((url, idx) => {
                return (
                  <img
                    id="single-artwork-img"
                    src={url}
                    alt={artwork.artist}
                    key={idx}
                  />
                )
              })
            ) : (
              <Loading />
            )}
            <div className="single-artwork-artist">
              {this.props.artwork.Location ? (
                <div>
                  <h1 id="artist-name">{artwork.artist}</h1>
                  <p id="art-address">{artwork.Location.address}</p>
                  <br />
                  <p id="art-description">{artwork.description}</p>
                </div>
              ) : (
                ''
              )}
              <br />
              <ArtworkOptions artwork={artwork} />
              <button
                type="button"
                onClick={() => {
                  addToFavorites(artwork.id)
                }}
              >
                Add to Favorites
              </button>
              <BackButton />
            </div>
          </div>
        ) : (
          <div>
            <p>No artworks here</p>
            <Link to={`/artwork/${this.props.match.params.id}`}>
              <button id="retry-btn" type="button">
                Retry
              </button>
            </Link>
            <Link to="/map">
              <button id="view-map-btn" type="submit">
                View Map
              </button>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  artwork: state.artwork.selected
})

const mapDispatch = dispatch => ({
  getOneArtwork: artworkId => dispatch(fetchOneArtwork(artworkId)),
  addToFavorites: artworkId => dispatch(addFavoriteArtwork(artworkId))
})

export default connect(mapState, mapDispatch)(SingleArtwork)
