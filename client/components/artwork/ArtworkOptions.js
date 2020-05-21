/* eslint-disable no-alert */
import React from 'react'
import Popup from 'reactjs-popup'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {verifyArtworkInDB, addTagsToDB} from '../../store/artworks'
import {me} from '../../store/user'
import './style/artworkOptions.css'
import '../mapView/mapView.css'
import {
  mobileContentStyle,
  desktopContentStyle
} from '../popups/style/popupStyle'

class ArtworkOptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: 'enter tags separated by commas',
      open: false
    }

    this.handleTagging = this.handleTagging.bind(this)
    this.handleVerify = this.handleVerify.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    this.props.getMe()
  }

  handleVerify(e) {
    e.preventDefault()
    const {artwork, user, verifyArtwork} = this.props
    if (artwork.userId !== user.id) {
      verifyArtwork(artwork.id)
      // alert('Thanks so much! This artwork has now been verified!')
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

  openModal() {
    this.setState({open: true})
  }
  closeModal() {
    this.setState({open: false})
  }

  render() {
    const {artwork, user} = this.props
    console.log('>>>>>>', artwork.isVerified)
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
            <div>
              <button
                id="verify-btn"
                type="button"
                onClick={ev => {
                  ev.preventDefault()
                  this.openModal()
                }}
              >
                {artwork.isVerified ? 'V E R I F I E D' : 'V E R I F Y'}
              </button>
            </div>
            <Popup
              className="popup-contaner"
              open={this.state.open}
              closeOnDocumentClick
              contentStyle={
                innerWidth < 768 ? mobileContentStyle : desktopContentStyle
              }
              onClose={() => {
                this.closeModal()
              }}
            >
              <button
                id="confirm-popup"
                type="submit"
                onClick={e => this.handleVerify(e)}
              >
                I've seen this piece here IRL! <br />
                  <button 
                  id="verify-btn"
                  type="submit"
                  onClick={() => {
                    this.closeModal()
                  }}
                  >
                    Verify
                  </button>
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
