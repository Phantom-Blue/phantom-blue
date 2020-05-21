/* eslint-disable no-alert */
import React from 'react'
import Popup from 'reactjs-popup'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {verifyArtworkInDB, addTagsToDB} from '../../store/artworks'
import {me} from '../../store/user'
import './style/artworkOptions.css'

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
      addTags(artwork.id, cleanTag)
    })
    this.setState({
      tags: ''
    })
  }

  render() {
    const {artwork, user} = this.props
    return (
      <div>
        <div className="additional-artwork-info">
          <div>
            <p>{artwork.description}</p>
            <br />
          </div>
          <div>
            <h2 id="tags">T A G S:</h2>
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
                <button id="verify-btn" type="button">
                  V E R I F Y
                </button>
              }
            >
              <button
                id="confirm-popup"
                type="submit"
                onClick={e => this.handleVerify(e)}
              >
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
        {/** Show edit to user specific artwork */}
        {user && (user.id === artwork.UserId || user.isAdmin) ? (
          <Link to={`/artwork/${artwork.id}/edit`}>
            <button id="edit-btn" type="submit">
              E D I T
            </button>
          </Link>
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
  getMe: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(ArtworkOptions)
