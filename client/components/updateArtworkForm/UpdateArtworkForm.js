import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchUpdatedArtwork,
  fetchOneArtwork,
  postArtwork,
  removeArtwork
} from '../../store/artworks'
import './updateArtworkForm.css'

class UpdateArtworkForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updateArtist: '',
      updateImageUrl: [],
      updateImageFile: [],
      displayImages: [],
      updateDescription: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDeleteImage = this.handleDeleteImage.bind(this)
    this.handleDeleteArtwork = this.handleDeleteArtwork.bind(this)
  }
  async componentDidMount() {
    await this.props.getSingleArtwork(this.props.match.params.id)
    this.setState({
      updateArtist: this.props.artwork.artist,
      updateImageUrl: this.props.artwork.imageUrl,
      updateDescription: this.props.artwork.description,
      displayImages: this.props.artwork.imageUrl
    })
  }
  // handles change of all inputs except for imageFile
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  //handles update of file changes
  handleFileChange(e, state) {
    if (e.target.files[0]) {
      let reader = new FileReader()
      reader.onload = () => {
        console.log('handle file', this.state)
        this.setState({
          updateImageFile: [...state.updateImageFile, reader.result],
          displayImages: [...state.displayImages, reader.result]
        })
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  handleUpdate(e, updateArtworkId) {
    e.preventDefault()
    const updatedArtworkInfo = {
      artist: this.state.updateArtist,
      imageUrl: this.state.updateImageUrl,
      newImages: this.state.updateImageFile,
      description: this.state.updateDescription
    }
    this.props.handleUpdateArtwork(updateArtworkId, updatedArtworkInfo)
    this.props.history.push(`/artwork/${updateArtworkId}`)
  }

  // handles delete of existing images
  handleDeleteImage(artworkImg) {
    const updatedUrls = this.state.updateImageUrl.filter(
      art => art !== artworkImg
    )
    const updatedUris = this.state.updateImageFile.filter(
      art => art !== artworkImg
    )
    const updatedDisplay = this.state.displayImages.filter(
      art => art !== artworkImg
    )
    this.setState({
      updateImageUrl: updatedUrls,
      updateImageFile: updatedUris,
      displayImages: updatedDisplay
    })
  }

  // handle delete artwork
  handleDeleteArtwork(artworkId) {
    const {history} = window
    this.props.removeArtwork(artworkId)
    history.back()
    history.back()
  }

  render() {
    const {artwork} = this.props
    console.log('inside render', this.props)
    const handleDeleteImage = this.handleDeleteImage
    return (
      <div className="update-form-container">
        <form>
          <h2>Update Artwork</h2>
          <div className="update-artwork-container">
            {this.state.displayImages
              ? this.state.displayImages.map((artImg, idx) => {
                  return (
                    <div key={idx}>
                      <img src={artImg} alt="Artwork Image" />
                      <button
                        id="update-art-btn"
                        type="button"
                        onClick={() => {
                          handleDeleteImage(artImg)
                        }}
                      >
                        Remove image
                      </button>
                    </div>
                  )
                })
              : ''}
          </div>
          <div id="file-container">
            <input
              id="file"
              type="file"
              name="updateImageFile"
              onChange={e => this.handleFileChange(e, this.state)}
            />
            <label htmlFor="file" className="file-label">
              Upload Another Photo
            </label>
          </div>
          <div id="update-artist-name">
            <input
              id="update-artist-name"
              type="text"
              name="updateArtist"
              value={this.state.updateArtist}
              placeholder="Artist name"
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div id="update-textarea">
            <textarea
              type="text"
              name="updateDescription"
              value={this.state.updateDescription}
              onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <button
              id="delete-artwork-btn"
              type="button"
              onClick={() => this.handleDeleteArtwork(artwork.id)}
            >
              Delete
            </button>
          </div>
          <div>
            <button
              id="update-artwork-btn"
              type="submit"
              onClick={e => this.handleUpdate(e, artwork.id)}
            >
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
  getSingleArtwork: artworkId => dispatch(fetchOneArtwork(artworkId)),
  postArtwork: state => dispatch(postArtwork(state)),
  removeArtwork: artworkId => dispatch(removeArtwork(artworkId))
})

export default connect(mapState, mapDispatch)(UpdateArtworkForm)
