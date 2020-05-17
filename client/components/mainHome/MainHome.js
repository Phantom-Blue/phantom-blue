/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
import React from 'react'
import {connect} from 'react-redux'
import {fetchAllVerified, fetchArtFromMyLocation} from '../../store/artworks'
import ArtByLocationMap from '../mapView/ArtByLocationMap'
import {generateUrl} from '../artwork/utils'
import {Link} from 'react-router-dom'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import './mainHome.css'
import '../../../secrets'
import ls from 'local-storage'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
// import 'mapbox-gl-js/v1.10.0/mapbox-gl.css'

class MainHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: false,
      longitude: 0,
      latitude: 0,
      address: null
    }
    this.handleLocation = this.handleLocation.bind(this)
    this.handleGeocode = this.handleGeocode.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleLocation() {
    const {getMyLocationArt} = this.props
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        ls.set('latitude', latitude)
        ls.set('longitude', longitude)
      })
      const lat = ls.get('latitude')
      const long = ls.get('longitude')
      const myLocation = {
        latitude: lat,
        longitude: long
      }

      getMyLocationArt(myLocation)

      this.setState({
        latitude: lat,
        longitude: long,
        location: true
      })
    } else {
      console.log('Geolocation not available')
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    const {latitude, longitude} = this.state

    const myLocation = {latitude, longitude}

    this.props.getMyLocationArt(myLocation)

    this.setState({
      location: true
    })
  }

  async handleGeocode(geocoder) {
    // console.log('GOT IN GEOCODE')
    // const coded = await geocoder._geocode(geocoder._inputEl.value)
    // if (coded.body.features[0]) {
    //   let longitude = coded.body.features[0].center[0]
    //   let latitude = coded.body.features[0].center[1]
    //   let address = coded.body.features[0].place_name
    //   this.setState({
    //     latitude,
    //     longitude,
    //     address
    //   })
    // } else {
    //   this.setState({
    //     error: {response: 'Invalid Address'}
    //   })
    // }
  }

  componentDidMount() {
    this.props.getVerifiedArtwork()

    // var geocoder = new MapboxGeocoder({
    //   accessToken: process.env.REACT_APP_MAPBOX_KEY,
    //   types: 'country,region,place,locality,neighborhood, address'
    // })
    // geocoder.addTo('#geocoder')
    // geocoder._inputEl.addEventListener('change', () => {
    //   this.handleGeocode(geocoder)
    // })
  }

  render() {
    return this.state.location === false ? (
      <div>
        <div className="search-section">
          <div className="search-label">
            <p>To find street art near you,</p>
            <h4>enter you address:</h4>
          </div>
          <div className="search-box-submit">
            {/* <div id="geocoder" /> */}
            <button
              type="submit"
              className="submit"
              onClick={e => {
                this.handleSubmit(e)
              }}
            >
              Submit!
            </button>
          </div>
        </div>
        <div className="share-location-section">
          <button
            type="submit"
            className="share-location"
            onClick={() => this.handleLocation()}
          >
            or use your current location
          </button>
        </div>
        {this.props.artworks[0] ? (
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={this.props.artworks.length}
          >
            <Slider className="carousel">
              {this.props.artworks.map((artwork, i) => (
                <Slide index={i} key={artwork.id} className="carousel-image">
                  <img src={artwork.imageUrl[0]} />
                  <Link to={`/artwork/${artwork.id}`}>
                    <button type="button">
                      <div>
                        <h2>{artwork.artist}</h2>
                      </div>
                    </button>
                  </Link>
                  <div>
                    <p>{artwork.description}</p>
                  </div>
                  <a
                    href={generateUrl(artwork.Location.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h4>TAKE ME THERE</h4>
                  </a>
                </Slide>
              ))}
            </Slider>
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
          </CarouselProvider>
        ) : (
          <center>
            <h2>L O A D I N G . . .</h2>
            <img
              src="http://gisellezatonyl.com/images/blobbers-03-newalgos-12-23-13-02-lessframes-600pxw.gif"
              width="300"
            />
          </center>
        )}
      </div>
    ) : (
      <ArtByLocationMap
        artworks={this.props.locationArtworks}
        latitude={this.state.latitude}
        longitude={this.state.longitude}
      />
    )
  }
}

const mapState = state => ({
  artworks: state.artwork.verified,
  locationArtworks: state.artwork.selected
})

const mapDispatch = dispatch => ({
  getVerifiedArtwork: () => dispatch(fetchAllVerified()),
  getMyLocationArt: location => dispatch(fetchArtFromMyLocation(location))
})

export default connect(mapState, mapDispatch)(MainHome)
