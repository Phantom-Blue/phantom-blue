/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {fetchAllVerified, fetchArtFromMyLocation} from '../../store/artworks'
import {setLocation} from '../../store/location'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import './mainHome.css'
import '../upload/searchBar.css'
import '../../../secrets'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import MapView from '../mapView/MapView'
import ls from 'local-storage'
import Loading from '../utils/Loading'
import {setLSLocation, getLSLocation, generateUrl} from '../utils/utils'

class MainHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: false,
      longitude: 0,
      latitude: 0
    }
    this.handleLocation = this.handleLocation.bind(this)
    this.handleGeocode = this.handleGeocode.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getVerifiedArtwork()

    var geocoder = new MapboxGeocoder({
      accessToken: process.env.REACT_APP_MAPBOX_KEY,
      types: 'country,region,place,locality,neighborhood, address'
    })
    geocoder.addTo('#geocoder')
    geocoder._inputEl.addEventListener('change', () => {
      this.handleGeocode(geocoder)
    })
  }

  handleLocation(e) {
    const {getMyLocationArt, setUserLocation} = this.props

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const myLocation = {latitude, longitude}
        setLSLocation(myLocation)
        console.log('IN HANDLE LOCATION IF STATEMENT', myLocation)
        console.log('IN HANDLE LOCATION IF STATEMENT', getLSLocation())
      })

      const myLocation = getLSLocation()

      getMyLocationArt(myLocation)
      setUserLocation(myLocation)

      this.setState({
        latitude: myLocation.latitude,
        longitude: myLocation.longitude,
        location: true,
        error: null
      })
    } else {
      console.log('Geolocation not available')
    }
  }

  async handleSubmit(e) {
    e.preventDefault()

    const {latitude, longitude} = this.state
    const {getMyLocationArt, setUserLocation} = this.props

    const myLocation = {latitude, longitude}

    await getMyLocationArt(myLocation)
    await setUserLocation(myLocation)

    this.setState({
      location: true
    })

    // console.log('MY LOCATION IN MAIN HOME SUBMIT',myLocation)
    // console.log('PROPS IN MAIN HOME SUBMIT',this.props)
  }

  async handleGeocode(geocoder) {
    const coded = await geocoder._geocode(geocoder._inputEl.value)
    if (coded.body.features[0]) {
      let longitude = coded.body.features[0].center[0]
      let latitude = coded.body.features[0].center[1]
      let address = coded.body.features[0].place_name
      this.setState({
        latitude,
        longitude
      })
    } else {
      this.setState({
        error: {response: 'Invalid Address'}
      })
    }
  }

  render() {
    const {latitude, longitude} = this.state
    const userLocation = {latitude, longitude}
    console.log(this.props.artworks)

    return this.state.location === false && this.props.artworks ? (
      <div>
        <div className="search-section">
          <div className="search-label">
            <p id="address-ad">TO FIND STREET ART NEAR YOU,</p>
            <h4 id="address-prompt">ENTER YOU ADDRESS:</h4>
          </div>
          <div className="search-box-submit">
            <div id="geocoder" />
            <button
              id="submit-search-btn"
              type="submit"
              className="submit"
              onClick={e => {
                this.handleSubmit(e)
              }}
            >
              Submit
            </button>
            <div className="share-location-section">
              <button
                id="share-location-btn"
                type="submit"
                className="share-location"
                onClick={e => this.handleLocation(e)}
              >
                or use your current location
              </button>
            </div>
          </div>
        </div>
        {this.props.artworks ? (
          <div className="carousel-container">
            <CarouselProvider
              naturalSlideWidth={100}
              naturalSlideHeight={170}
              totalSlides={this.props.artworks.length}
              touchEnabled
              playDirection
              currentSlide
            >
              <Slider className="carousel-details">
                {this.props.artworks.map((artwork, i) => (
                  <Slide index={i} key={artwork.id}>
                    <div>
                      <img
                        id="carousel-arwork-img"
                        src={artwork.imageUrl[0]}
                        alt="artwork image"
                      />

                      <Link to={`/artwork/${artwork.id}`}>
                        <h2 id="carousel-artist-name">{artwork.artist}</h2>
                      </Link>
                      <div>
                        <p id="carousel-art-description">
                          {artwork.description}
                        </p>
                      </div>
                      <div>
                        <a
                          id="navegation-link"
                          href={generateUrl(artwork.Location.address)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          TAKE ME THERE
                        </a>
                        <div className="carousel-btns">
                          {/** CHECKS IF CAROUSEL HAS MORE THAN ONE IMG TO DISPLAY CONTROLS */}
                          {this.props.artworks.length > 1 ? (
                            <div>
                              <ButtonBack id="previous-btn">&#8249;</ButtonBack>
                              <ButtonNext id="forward-btn">&#8250;</ButtonNext>
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </div>
                  </Slide>
                ))}
              </Slider>
            </CarouselProvider>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    ) : this.props.artNearMe[0] ? (
      <Redirect to="/map" />
    ) : (
      // <MapView artToMapFromMain={this.props.artNearMe} />
      <Loading />
    )
  }
}

const mapState = state => ({
  artworks: state.artwork.verified,
  artNearMe: state.artwork.artNearMe,
  location: state.location
})

const mapDispatch = dispatch => ({
  getVerifiedArtwork: () => dispatch(fetchAllVerified()),
  getMyLocationArt: location => dispatch(fetchArtFromMyLocation(location)),
  setUserLocation: location => dispatch(setLocation(location))
})

export default connect(mapState, mapDispatch)(MainHome)
