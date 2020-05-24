/* eslint-disable camelcase */
import React from 'react'
import {connect} from 'react-redux'
import {postArtwork} from '../../store/artworks'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import './searchBar.css'
import axios from 'axios'
import '../../../secrets'
import {setLocation} from '../../store/location'
import BackButton from '../utils/BackButton'
import Loading from '../utils/Loading'

export class UploadForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      artist: '',
      description: '',
      imageFile: null,
      latitude: null,
      longitude: null,
      address: null,
      error: null,
      loading: false,
      locationLoading: false,
      geocoder: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleGeocode = this.handleGeocode.bind(this)
    this.handleFileRead = this.handleFileRead.bind(this)
    this.handleLocation = this.handleLocation.bind(this)
  }

  handleGeocode(data) {
    if (data.result) {
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
      types: 'address',
      reverseGeocode: true,
      placeholder: 'Address'
    })
    geocoder.addTo('#geocoder')

    geocoder.on('result', data => {
      this.handleGeocode(data)
    })
    this.setState({geocoder})
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  // eslint-disable-next-line complexity
  async handleSubmit(e) {
    e.preventDefault()
    const {artist, description, latitude, longitude, address} = this.state

    if (!latitude || !longitude || !address || !this.state.imageFile) {
      this.setState({error: 'Enter all required fields.'})
      return
    }
    this.setState({loading: true})
    const imageUrl = await this.sendFile()
    try {
      this.props.postArtwork({
        artist,
        description,
        imageUrl,
        latitude,
        longitude,
        address
      })
    } catch (err) {
      this.setState({error: err})
      return console.error(err)
    }
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

  handleLocation() {
    if ('geolocation' in navigator) {
      let bigThis = this
      this.setState({locationLoading: true})
      navigator.geolocation.getCurrentPosition(async function(position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        const geocoder = bigThis.state.geocoder

        const response = await geocoder._geocode(`${latitude}, ${longitude}`)

        const address = response.body.features[0].place_name

        bigThis.setState({
          latitude,
          longitude,
          address,
          locationLoading: false
        })
        bigThis.state.geocoder._inputEl.value = address
      })
    } else {
      console.log('Geolocation not available')
      this.setState({error: 'Geolocation not available.'})
    }
  }

  async sendFile() {
    const file = await axios.post(
      `https://api.cloudinary.com/v1_1/pentimento/upload`,
      {file: this.state.imageFile, upload_preset: 'ea0bwcdh'}
    )
    return file.data.secure_url
  }

  errorMessage() {
    if (this.props.error) {
      return 'Enter all required fields'
    } else if (this.state.error === 'Missing image file.') {
      return 'Add an image.'
    } else if (this.state.error === 'Missing location information.') {
      return 'Add a location.'
    } else if (this.state.error === 'Geolocation not available.') {
      return 'Geolocation not available.'
    } else if (this.state.error === 'Enter all required fields') {
      return 'Enter all required fields'
    }
    return 'Error.'
  }

  render() {
    const handleChange = this.handleChange
    const handleSubmit = this.handleSubmit
    const handleLocation = this.handleLocation
    return !this.state.loading ? (
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
            {this.state.imageFile ? (
              <img src={this.state.imageFile} className="currentImg" />
            ) : (
              ''
            )}
          </div>
          <div id="geocoder" />
          {!this.state.locationLoading ? (
            <button type="button" onClick={handleLocation}>
              {' '}
              Use my location{' '}
            </button>
          ) : (
            'Fetching location...'
          )}
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
            <BackButton />
          </div>
        </form>
        <div>{this.props.error ? <p>{this.errorMessage()}</p> : ''}</div>
      </div>
    ) : (
      <Loading />
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
