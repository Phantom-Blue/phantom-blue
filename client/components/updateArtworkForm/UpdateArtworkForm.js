import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {fetchUpdatedArtwork, fetchOneArtwork} from '../../store/artworks'

class UpdateArtworkForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updateArtist: '',
      updateImageUrl: [],
      updateDescription: ''
    }

    this.handleChange = this.handleChange.bind(this)
    // this.handleFileChange = this.handleFileChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDeleteImage = this.handleDeleteImage.bind(this)
  }
  async componentDidMount() {
    await this.props.getSingleArtwork(this.props.match.params.id)
    this.setState({
      updateArtist: this.props.artwork.artist,
      updateImageUrl: this.props.artwork.imageUrl,
      updateDescription: this.props.artwork.description
    })
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // TODO: Continue working on  a separate edit for upload
  // handleFileChange(e) {
  //   this.setState({
  //     [e.target.name]: e.target.files[0]
  //   })
  //   console.log(e.target.files[0].name)
  // }
  handleUpdate(e, updateArtworkId) {
    e.preventDefault()
    const updatedArtworkInfo = {
      artist: this.state.updateArtist,
      imageUrl: this.state.updateImageUrl,
      description: this.state.updateDescription
    }
    this.props.handleUpdateArtwork(updateArtworkId, updatedArtworkInfo)
  }

  async handleDeleteImage(artworkImg) {
    const update = await this.state.updateImageUrl.filter(
      art => art !== artworkImg
    )
    this.setState({updateImageUrl: update})
  }

  render() {
    const {artwork} = this.props || {}
    const handleDeleteImage = this.handleDeleteImage
    return (
      <div className="update-form-container">
        <form onSubmit={e => this.handleUpdate(e, artwork.id)}>
          <h1>Update Artwork</h1>
          <div>
            <input
              type="text"
              name="updateArtist"
              value={this.state.updateArtist}
              placeholder="Artist name"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            {this.state.updateImageUrl
              ? this.state.updateImageUrl.map((artImg, idx) => {
                  return (
                    <div key={idx}>
                      <img src={artImg} alt="Artwork Image" />
                      <button
                        type="submit"
                        onClick={function() {
                          handleDeleteImage(artImg)
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )
                })
              : ''}
            {/*<input
              type="file"
              name="updateImageUrl"
              value={this.state.updateImageUrl}
              onChange={e => this.handleChange(e)}
           /> */}
          </div>
          <div>
            <textarea
              type="text"
              name="updateDescription"
              value={this.state.updateDescription}
              placeholder="Description"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <button id="update-artwork-btn" type="submit">
              Update Artwork
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  artwork: state.artwork.selected
})

const mapDispatch = dispatch => ({
  handleUpdateArtwork: (artworkId, artworkUpdatedInfo) => {
    dispatch(fetchUpdatedArtwork(artworkId, artworkUpdatedInfo))
  },
  getSingleArtwork: artworkId => dispatch(fetchOneArtwork(artworkId))
})

export default connect(mapState, mapDispatch)(UpdateArtworkForm)
