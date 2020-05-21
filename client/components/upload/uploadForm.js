/* eslint-disable camelcase */
import React from 'react'
import {connect} from 'react-redux'
import {postArtwork} from '../../store/artworks'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import './searchBar.css'
import axios from 'axios'
import '../../../secrets'
import {setLocation} from '../../store/location'

export class UploadForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      artist: '',
      description: '',
      imageFile: null,
      imageUrl: null,
      latitude: null,
      longitude: null,
      address: null,
      error: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleGeocode = this.handleGeocode.bind(this)
    this.handleFileRead = this.handleFileRead.bind(this)
  }

  handleGeocode(data) {
    if (data.result) {
      // let tileset = 'mstykmshy.ckaegfldq0f8129pn0jmcuzfp-20i0t'
      // let radius = 100000
      // let limit = 50

      // let query = 'https://api.mapbox.com/v4/' + tileset + '/tilequery/' + data.result.center[1] + ',' + data.result.center[0] + '.json?radius=' + radius + '&limit= ' + limit + ' &access_token=' + process.env.REACT_APP_MAPBOX_KEY;

      // const res = await axios.get(query)
      // console.log(data)
      // console.log(query)
      // console.log(res.data)
      let latitude = data.result.center[1]
      let longitude = data.result.center[0]
      let address = data.result.place_name
      this.setState({
        latitude,
        longitude,
        address
      })
    } else {
      this.setState({
        error: {response: 'Invalid Address'}
      })
    }
  }

  componentDidMount() {
    var geocoder = new MapboxGeocoder({
      accessToken: process.env.REACT_APP_MAPBOX_KEY,
      types: 'country,region,place,locality,neighborhood, address'
    })
    geocoder.addTo('#geocoder')
    geocoder.on('result', data => {
      this.handleGeocode(data)
    })
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  // eslint-disable-next-line complexity
  handleSubmit(e) {
    e.preventDefault()

    // if (this.state.longitude && this.state.latitude && this.state.address && this.state.imageFile){
    //   const sendFile = async function(fileData) {
    //     const file = await axios.post(`https://api.cloudinary.com/v1_1/pentimento/upload`, {file: this.state.imageFile, upload_preset:      'ea0bwcdh'})
    //     return file.data.secure_url
    //   }
    //   const imageUrl = await this.sendFile(this.state.imageFile)
    //   this.setState({imageUrl: imageUrl})
    //
    // }

    // ^ This is code for if we were handling image uploading on the front end. This reduces the amount of data passed through our express server, but also makes it possible to upload images to the cloudinary database without any security checks, so for now it will stay on the backend.
    this.props.setLocation({
      latitude: this.state.latitude,
      longitude: this.state.longitude
    })
    this.props.postArtwork(this.state)
  }

  handleFileRead(e) {
    if (e.target.files[0]) {
      let reader = new FileReader()
      reader.onload = () => {
        this.setState({imageFile: reader.result})
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  async sendFile() {
    const file = await axios.post(
      `https://api.cloudinary.com/v1_1/pentimento/upload`,
      {file: this.state.imageFile, upload_preset: 'ea0bwcdh'}
    )
    console.log(file.data.secure_url)
    return file.data.secure_url
  }

  errorMessage() {
    if (
      this.props.error.response.data &&
      this.props.error.response.data.includes('notNull Violation')
    ) {
      return 'Enter all required fields'
    } else if (this.state.error === 'Missing image file.') {
      return 'Add an image.'
    } else if (this.state.error === 'Missing location information.') {
      return 'Add a location.'
    }
    // return 'Invalid Address'
    return 'Error.'
  }

  render() {
    const handleChange = this.handleChange
    const handleSubmit = this.handleSubmit
    return (
      <div className="upload-artwork-container">
        <form>
          <h1>Upload Artwork</h1>
          <div>
            <input
              id="upload-artist-name"
              type="text"
              value={this.state.artist}
              placeholder="Artist name"
              name="artist"
              onChange={e => {
                handleChange(e)
              }}
            />
          </div>
          <div id="upload-textarea">
            <textarea
              value={this.state.description}
              name="description"
              placeholder="Description"
              onChange={e => {
                handleChange(e)
              }}
            />
          </div>
          <div id="file-container">
            <input
              id="file"
              type="file"
              name="imageFile"
              onChange={e => this.handleFileRead(e)}
            />
            <label htmlFor="file" className="file-label">
              Upload Photo
            </label>
          </div>
          <div id="geocoder" />
          <div>
            <button
              id="upload-btn"
              type="submit"
              onClick={e => {
                handleSubmit(e)
              }}
            >
              Submit
            </button>
          </div>
        </form>
        <div>{this.props.error ? <p>{this.errorMessage()}</p> : ''}</div>
      </div>
    )
  }
}

const mapState = state => ({
  error: state.artwork.error,
  user: state.user
})

const mapDispatch = dispatch => ({
  postArtwork: state => {
    dispatch(postArtwork(state))
  },
  setLocation: (latitude, longitude) => {
    dispatch(setLocation(latitude, longitude))
  }
})

export default connect(mapState, mapDispatch)(UploadForm)
