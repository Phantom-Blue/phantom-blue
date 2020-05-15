/* eslint-disable no-alert */
import React from 'react'
import Popup from 'reactjs-popup'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  verifyArtworkInDB,
  addTagsToDB,
  removeArtwork
} from '../../store/artworks'
import {me} from '../../store/user'

class ArtworkOptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: 'enter tags separated by commas'
    }

    this.handleTagging = this.handleTagging.bind(this)
    this.handleVerify = this.handleVerify.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getMe()
  }

  handleVerify(e) {
    e.preventDefault()
    const {artwork, user, verifyArtwork} = this.props
    if (artwork.userId !== user.id) {
      verifyArtwork(artwork.id)
      alert('Thanks so much! This artwork has now been verified!')
    }
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleTagging(e) {
    e.preventDefault()
    const {artwork, addTags} = this.props
    this.state.tags.split(',').forEach(tag => {
      let cleanTag = tag.toLowerCase()
      // console.log(cleanTag)
      addTags(artwork.id, cleanTag)
    })
    this.setState({
      tags: ''
    })
  }

  handleDelete(e) {
    const {removeOneArtwork, artwork} = this.props
    removeOneArtwork(artwork.id)
  }

  render() {
    const {artwork, user} = this.props
    console.log(user.id, artwork.UserId, artwork)
    return (
      <div>
        <div className="additionalartworkinfo">
          <div>
            <p>{artwork.description}</p>
          </div>
          <div>
            <p>T A G S:</p>
            <p>
              {artwork.Tags ? artwork.Tags.map(tag => `| ${tag.tag} |`) : ''}
            </p>
          </div>
          <button type="submit" />
        </div>
        {// we render the verification option if the user is logged
        user.id ? (
          <div>
            <Popup
              trigger={
                <button type="button">
                  <h4> V E R I F Y </h4>
                </button>
              }
              // position="center right"
            >
              <button type="submit" onClick={e => this.handleVerify(e)}>
                I've seen this piece IRL, at this location!
              </button>
            </Popup>

            {/* <Popup
              trigger={<button type="button">Add Tags</button>}
              position="right center"
            >
              <form>
                <input
                  name="tags"
                  value={this.state.tags}
                  type="text"
                  onChange={e => this.handleChange(e)}
                />
                <button type="submit" onClick={e => this.handleTagging(e)}>
                  Tag it!
                </button>
              </form>
            </Popup> */}
          </div>
        ) : (
          ''
        )}
        {user.id === artwork.UserId ? (
          <Popup
            trigger={
              <button type="button">
                <h4> D E L E T E </h4>
              </button>
            }
            // position="center"
          >
            <Link to="/map">
              <button type="submit" onClick={e => this.handleDelete(e)}>
                Yes, delete this artwork
              </button>
            </Link>
          </Popup>
        ) : (
          ''
        )}
        {// we render the edit artwork component if the user is an admin
        user.isAdmin === true ? (
          <Popup
            trigger={
              <button type="button">
                <h4> D E L E T E </h4>
              </button>
            }
            // position="center"
          >
            <Link to="/map">
              <button type="submit" onClick={e => this.handleDelete(e)}>
                Yes, delete this artwork
              </button>
            </Link>
          </Popup>
        ) : (
          ''
        )}
        {// we render the edit artwork component if the user is an admin
        user.isAdmin === true ? (
          <Popup
            trigger={
              <button type="button">
                <h4>EDIT</h4>
              </button>
            }
          >
            <Link to={`/artwork/${artwork.id}/edit`}>
              <button type="submit">Yes, edit artwork</button>
            </Link>
          </Popup>
        ) : (
          ''
        )}
      </div>
    )
  }
}

// setting up connect reducers and thunks to make api calls once we have a db
const mapState = state => ({
  artwork: state.artwork.selected,
  user: state.user
})

const mapDispatch = dispatch => ({
  verifyArtwork: artworkId => dispatch(verifyArtworkInDB(artworkId)),
  addTags: (artworkId, tags) => dispatch(addTagsToDB(artworkId, tags)),
  removeOneArtwork: artworkId => dispatch(removeArtwork(artworkId)),
  getMe: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(ArtworkOptions)
