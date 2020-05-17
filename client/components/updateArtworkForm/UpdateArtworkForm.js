import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchUpdatedArtwork,
  fetchOneArtwork,
  postArtwork
} from '../../store/artworks'

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
        console.log(this.state)
        this.setState({
          updateImageFile: [...state.updateImageFile, reader.result],
          displayImages: [...state.displayImages, reader.result]
        })
        console.log(this.state)
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
    console.log(this.state)
    this.setState({
      updateImageUrl: updatedUrls,
      updateImageFile: updatedUris,
      displayImages: updatedDisplay
    })
  }

  render() {
    const {artwork} = this.props
    const handleDeleteImage = this.handleDeleteImage
    return (
      <div className="update-form-container">
        <form>
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
            {this.state.displayImages
              ? this.state.displayImages.map((artImg, idx) => {
                  return (
                    <div key={idx}>
                      <img src={artImg} alt="Artwork Image" />
                      <button
                        type="button"
                        onClick={() => {
                          handleDeleteImage(artImg)
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )
                })
              : ''}
            <input
              type="file"
              name="updateImageFile"
              onChange={e => this.handleFileChange(e, this.state)}
            />
          </div>
          <div>
            <textarea
              type="text"
              name="updateDescription"
              value={this.state.updateDescription}
              onChange={e => this.handleChange(e)}
            />
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
  postArtwork: state => dispatch(postArtwork(state))
})

export default connect(mapState, mapDispatch)(UpdateArtworkForm)
