/* eslint-disable no-alert */
import React from 'react'
import Popup from 'reactjs-popup'
import {connect} from 'react-redux'
import {
  verifyArtworkInDB,
  addTagsToDB,
  removeArtwork
} from '../../store/artworks'
import {me} from '../../store/user'

// importing edit artwork component, for when it's ready to plug in
import EditArtwork from './EditArtwork'

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
      alert('this artwork has been verified')
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
        <div className="additionalartworkinfo">
          <h4>{artwork.artist}</h4>
          <h5>{artwork.description}</h5>
          <p>
            {artwork.taggedArtwork
              ? artwork.taggedArtwork.tag.map(tag => `${tag}, `)
              : ''}
          </p>
          <button type="submit" />
        </div>
        {// we render the verification option if the user is logged
        user.id ? (
          <div>
            <Popup
              trigger={<button type="button">Verify</button>}
              position="right center"
            >
              <button type="submit" onClick={e => this.handleVerify(e)}>
                I've seen this piece IRL
              </button>
            </Popup>

            <Popup
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
            </Popup>
          </div>
        ) : (
          ''
        )}
        {// we render the edit artwork component if the user is an admin
        user.isAdmin === true ? <EditArtwork artworkId={artwork.id} /> : ''}
      </div>
    )
  }
}

// setting up connect reducers and thunks to make api calls once we have a db
const mapState = state => ({
  artwork: state.artwork,
  user: state.user
})

const mapDispatch = dispatch => ({
  verifyArtwork: artworkId => dispatch(verifyArtworkInDB(artworkId)),
  addTags: (artworkId, tags) => dispatch(addTagsToDB(artworkId, tags)),
  removeArtwork: artworkId => dispatch(removeArtwork(artworkId)),
  getMe: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(ArtworkOptions)
