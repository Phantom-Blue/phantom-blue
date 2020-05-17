import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
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
    this.sendFile = this.sendFile.bind(this)
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
        this.setState({
          updateImageFile: [...state.updateImageFile, reader.result],
          displayImages: [...state.displayImages, reader.result]
        })
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  // sends new files to cloud
  async sendFile(newFile) {
    let result
    const newFiles = newFile.map(async file => {
      const updatedUrl = await axios.post(
        `https://api.cloudinary.com/v1_1/pentimento/upload`,
        {
          file: file,
          // eslint-disable-next-line camelcase
          upload_preset: 'ea0bwcdh'
        }
      )
      console.log('send file ---->', updatedUrl.data.secure_url)
      return updatedUrl.data.secure_url
    })
    console.log('newFiles', newFiles)
    return newFiles
  }
  // const file = await axios.post(
  //     `https://api.cloudinary.com/v1_1/pentimento/upload`, {
  //       file: newFile,
  //       // eslint-disable-next-line camelcase
  //       upload_preset: 'ea0bwcdh'
  //     }
  //   )
  //   console.log('send file ---->', file.data.secure_url)
  //   return file.data.secure_url
  // }

  handleUpdate(e, updateArtworkId) {
    e.preventDefault()
    this.setState({updateImageFile: this.sendFile(this.state.updateImageFile)})
    console.log('update img file', this.state.updateImageFile)
    const updatedArtworkInfo = {
      artist: this.state.updateArtist,
      imageUrl: [...this.state.updateImageUrl, ...this.state.updateImageFile],
      description: this.state.updateDescription
    }
    this.props.handleUpdateArtwork(updateArtworkId, updatedArtworkInfo)
    // this.props.history.push(`/artwork/${updateArtworkId}`)
  }

  // handles delete of existing images
  async handleDeleteImage(artworkImg) {
    const update = await this.state.updateImageUrl.filter(
      art => art !== artworkImg
    )
    this.setState({updateImageUrl: update})
  }

  render() {
    const {artwork} = this.props
    // console.log('artwork' , artwork)
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
                        type="submit"
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
