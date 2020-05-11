import React from 'react'
import Popup from 'reactjs-popup'
import {connect} from 'react-redux'
import {verifyArtworkInDB, addTags, me} from '../../store'

// import functions that need to be made in utils, to check whether use is
// logged in or admin

// importing edit artwork component, for when it's ready to plug in
// import EditArtwork from './EditArtwork'

class ArtworkOptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVerified: false,
      tags: ''
    }
    this.handleTagging = this.handleTagging.bind(this)
    this.handleVerify = this.handleVerify.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const {artwork} = this.props
    this.setState({
      isVerified: artwork.isVerified
    })
  }

  handleVerify() {
    const {artwork, user} = this.props
    if (artwork.userId !== user.id) {
      // calling the thunk for when we have a db
      verifyArtwork(artwork.id)
      // meanwhile we simulate the action w local state
      this.setState({
        isVerified: true
      })
      alert('this artwork has been verified')
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleTagging() {
    const {artwork} = this.props
    addTags(artwork.id)
  }

  render() {
    const {artwork, user} = this.props
    return (
      <div>
        <div className="additionalartworkinfo">
          <h4>{artwork.artist}</h4>
          <h5>{artwork.description}</h5>
          <p>{artwork.tags.tagName}</p>
          <button type="submit" />
        </div>
        {// we render the verification option if the user is logged
        user.id ? (
          <div>
            <Popup
              trigger={<button type="button">Verify</button>}
              position="right center"
            >
              <button type="submit" onClick={this.handleVerify}>
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
                <button type="submit" onClick={this.handleTagging}>
                  Tag it!
                </button>
              </form>
            </Popup>
          </div>
        ) : (
          ''
        )}
        {/* {
          // we render the edit artwork component if the user is an admin
          user.isAdmin === true
          ? (
            <EditArtwork artworkId={artwork.id} />
          ) : ('')
        } */}
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
  user: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(ArtworkOptions)
