/* eslint-disable no-unused-vars */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUser} from '../../store/userHome'
import './userHome.css'

export class SingleUserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const user = this.props || {}
    const allArtwork = this.props.user.artwork
    const favorites = this.props.user.favorites
    return (
      <div>
        {this.props.user.firstName ? (
          <div className="user-home-container">
            <div className="user-info-container">
              <div>
                <h2 align="center" id="user-name">
                  {' '}
                  Welcome, {this.props.user.firstName}!
                </h2>
              </div>
            </div>
            <div className="saved-artwork">
              <h2>Your Uploaded Artwork</h2>
              <div className="users-artworks">
                {allArtwork
                  ? allArtwork.map(artwork => {
                      return (
                        <div className="artwork-display" key={artwork.id}>
                          <Link to={`/artwork/${artwork.id}`}>
                            <img src={artwork.imageUrl[0]} alt="Artwork" />
                            <p id="users-home-artist-name">{artwork.artist}</p>
                            <br />
                          </Link>
                        </div>
                      )
                    })
                  : "You haven't uploaded anything yet!"}
              </div>
            </div>
            <div className="saved-artwork">
              <h2>Your Saved Artwork</h2>
              <div className="users-artworks">
                {favorites
                  ? favorites.map(favoriteArtwork => {
                      return (
                        <div
                          className="artwork-display"
                          key={favoriteArtwork.id}
                        >
                          <Link to={`/artwork/${favoriteArtwork.id}`}>
                            <img
                              src={favoriteArtwork.imageUrl[0]}
                              alt="Artwork"
                            />
                            <p id="users-home-artist-name">
                              {favoriteArtwork.artist}
                            </p>
                            <br />
                          </Link>
                        </div>
                      )
                    })
                  : "You haven't uploaded anything yet!"}
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchUser: id => dispatch(fetchUser(id))
})

export default connect(mapState, mapDispatch)(SingleUserHome)
