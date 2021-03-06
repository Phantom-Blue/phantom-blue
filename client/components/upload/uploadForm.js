/* eslint-disable camelcase */
import React from 'react'
import {connect} from 'react-redux'
import {postArtwork} from '../../store/artworks'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import './searchBar.css'
import axios from 'axios'
import '../../../secrets'
import ls from 'local-storage'
import {setLocation} from '../../store/location'
import BackButton from '../utils/BackButton'
import Loading from '../utils/Loading'

const mapboxKey =
  'pk.eyJ1IjoiZ2lzZWxsZXoiLCJhIjoiY2s5eWtwN21nMHZ6cDNybnRwMXNvYWo3bCJ9.Z1LvYD3L9CGq3EpnxaKglg'

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
    this.sendFile = this.sendFile.bind(this)
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
      accessToken:
        'pk.eyJ1IjoiY2hyb21hdGljYmxhY2siLCJhIjoiY2thOXZ4bmdmMGRzdDJ0bWd2b2JrOHNqYiJ9.mfvYVXS09PgNdRH2SB6Ncg',
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
    const {
      artist,
      description,
      imageFile,
      latitude,
      longitude,
      address
    } = this.state
    if (latitude && longitude && address && imageFile) {
      this.setState({loading: true})
      const imageUrl = await this.sendFile()
      this.props.postArtwork({
        artist,
        description,
        imageUrl,
        latitude,
        longitude,
        address
      })
    } else {
      this.setState({error: 'Photo and location are required.'})
    }
  }

  async sendFile() {
    const file = await axios.post(
      `https://api.cloudinary.com/v1_1/pentimento/upload`,
      {file: this.state.imageFile, upload_preset: 'ea0bwcdh'}
    )
    return file.data.secure_url
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
      const bigThis = this
      this.setState({locationLoading: true})
      navigator.geolocation.getCurrentPosition(
        async function(position) {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          ls.set('latitude', latitude)
          ls.set('longitude', longitude)
          const geocoder = bigThis.state.geocoder

          const response = await geocoder._geocode(`${latitude}, ${longitude}`)
          const address = response.body.features[0].place_name

          console.log(latitude, longitude)
          bigThis.setState({
            latitude: latitude,
            longitude: longitude,
            address,
            locationLoading: false
          })
          bigThis.state.geocoder._inputEl.value = address
          console.log(bigThis.state)
        },
        function(error) {
          console.log('Something went wrong!', error)
        },
        {timeout: 10000}
      )
    } else {
      console.log('Geolocation not available')
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
    if (this.props.error) {
      return 'Enter all required fields'
    } else if (this.state.error === 'Missing image file.') {
      return 'Add an image.'
    } else if (this.state.error === 'Missing location information.') {
      return 'Add a location.'
    }
    // return 'Invalid Address'
    if (this.state.error) {
      return this.state.error
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
            {this.state.imageFile ? (
              <img src={this.state.imageFile} id="currentImg" />
            ) : (
              ''
            )}
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
          {this.state.locationLoading ? (
            <p>Fetching location..</p>
          ) : (
            <button type="button" onClick={handleLocation}>
              {' '}
              Use my location{' '}
            </button>
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
        <div>
          {this.props.error || this.state.error ? (
            <p>{this.errorMessage()}</p>
          ) : (
            ''
          )}
        </div>
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
