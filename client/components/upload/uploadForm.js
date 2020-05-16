import React from 'react'
import {connect} from 'react-redux'
import {postArtwork} from '../../store/artworks'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import './upload.css'

import '../../../secrets'

export class UploadForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      imageFile: '',
      latitude: null,
      longitude: null,
      address: null,
      error: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleGeocode = this.handleGeocode.bind(this)
    this.handleFile = this.handleFile.bind(this)
  }

  async handleGeocode(geocoder) {
    const coded = await geocoder._geocode(geocoder._inputEl.value)

    console.log(coded)
    if (coded.body.features[0]) {
      let longitude = coded.body.features[0].center[0]
      let latitude = coded.body.features[0].center[1]
      let address = coded.body.features[0].place_name
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

    geocoder._inputEl.addEventListener('change', () => {
      this.handleGeocode(geocoder)
    })
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.postArtwork(this.state)
  }

  handleFile(e) {
    let reader = new FileReader()
    reader.onload = () => {
      this.setState({imageFile: reader.result})
    }
    reader.readAsDataURL(e.target.files[0])
  }

  errorMessage() {
    if (
      this.props.error.response.data &&
      this.props.error.response.data.includes('notNull Violation')
    ) {
      return 'Enter all required fields'
    }
    // return 'Invalid Address'
    return 'Enter all required fields'
  }

  render() {
    const handleChange = this.handleChange
    const handleSubmit = this.handleSubmit
    return (
      <div>
        <form>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            value={this.state.name}
            name="name"
            onChange={e => {
              handleChange(e)
            }}
          />
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            value={this.state.description}
            name="description"
            onChange={e => {
              handleChange(e)
            }}
          />
          <label htmlFor="imageFile">Image File:</label>
          <input
            id="imageFile"
            type="file"
            name="imageFile"
            onChange={e => {
              this.handleFile(e)
            }}
          />
          <label>Address:</label>
          <div id="geocoder" />
          <button
            type="submit"
            onClick={e => {
              handleSubmit(e)
            }}
          >
            Submit!
          </button>
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
  }
})

export default connect(mapState, mapDispatch)(UploadForm)
