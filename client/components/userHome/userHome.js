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

  componentDidMount() {
    // this.props.fetchUser(this.props.match.params.id)
    // console.log('this.props.match.params', this.props.match.params)
  }

  render() {
    // console.log('>>>>> this.props:', this.props)
    const user = this.props || {}
    const allArtwork = this.props.user.artwork
    return (
      <div>
        {this.props.user.firstName ? (
          <div className="user-home-container" align="center">
            <br />
            <h2> Welcome, {this.props.user.firstName}! </h2>
            <br />
            <img src={this.props.user.imageUrl} width="100%" />
            <br />
            <div className="saved-artwork">
              <h5 align="center">Your Uploaded Artwork</h5>
              <br />
              <div className="users-artworks" align="center">
                {allArtwork
                  ? allArtwork.map(artwork => {
                      return (
                        <div className="artwork-display" key={artwork.id}>
                          <Link to={`/artwork/${artwork.id}`} />
                          <img
                            src={artwork.imageUrl}
                            alt="Artwork"
                            width="250px"
                          />
                          <p>{artwork.artist}</p>
                          <br />
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
