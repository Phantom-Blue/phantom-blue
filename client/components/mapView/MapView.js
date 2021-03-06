/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable complexity */
/* eslint-disable react/no-access-state-in-setstate */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllArtworks, fetchArtFromMyLocation} from '../../store/artworks'
import {setLocation} from '../../store/location'
import ReactMapGl, {
  Marker,
  NavigationControl,
  FullscreenControl
} from 'react-map-gl'
//IMPORTS GEOCODER MODULE FOR REACT MAPGL
import Geocoder from 'react-map-gl-geocoder'
import Popup from 'reactjs-popup'
// CUSTOMIZE POP UP STYLING
import {
  mapPopupDesktopStyle,
  mobileContentStyle
} from '../popups/style/popupStyle'
import Artwork from '../artwork/Artwork'
import '../../../secrets'
import './mapView.css'
import './mapBoxGL.css'
import MapPin from './MapPin'
// VIEW AS A LIST POPUP
import ArtistListPopup from '../popups/artistListPopup'
//IMPORTS TWO UTILITY FUCNTIONS TO GET AND SET LATITUDE AND LONGITUDE TO LOCAL STATE // COULD BE REFACTORED TO RECEIVE ANY ARGS
import {getLSLocation, setLSLocation, windowCheck} from '../utils/utils'
import Loading from '../utils/Loading'
// import {Loading, getAccessToken} from '../utils'

const mapboxKey =
  'pk.eyJ1IjoiY2hyb21hdGljYmxhY2siLCJhIjoiY2thOXZ4bmdmMGRzdDJ0bWd2b2JrOHNqYiJ9.mfvYVXS09PgNdRH2SB6Ncg'

class MapView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        latitude: 40.7736,
        longitude: -73.9566,
        width: '100vw',
        height: '100vh',
        zoom: 11
      },
      selectedPin: null,
      open: false,
      myLocation: false,
      /// SET A LOCAL STATE FOR ARTWORKS TO BE MAPPED IN RENDER.
      //ALL ARTWORK THUNKS CAN DEPOSIT ART IN HERE, AND OVERRIDE EACH OTHER
      // DEPENDING ON USER ACTION, ONLY ONE GROUP OF ARTWORKS GETS MAPPED AT A TIME
      artworks: [],
      viewAll: false
      // cooldown: false
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleNewSearch = this.handleNewSearch.bind(this)
  }

  // CHECKS FOR ARTWORKS PASSED AS PROPS FROM OTHER COMPONENTS - MAINLY MAIN HOME :P
  // OTHERWISE TAKES CARE OF CHECKING THE LOCAL STORAGE FOR A LEFTOVER USER LOCATION, AND CALLS A LOCATION THUNK, IF FOUND
  // IF NO INFORMATION IS AVAILABLE, IT CALLS A THUNK TO RECEIVE ALL ARTWORKS
  async componentDidMount() {
    const lSLocation = getLSLocation()
    const {getMyLocationArt, getUserLocation} = this.props

    if (lSLocation) {
      await getMyLocationArt(lSLocation)
    }
    await this.props.getAllArtWorks()

    const myLocation = {
      latitude: this.props.location.latitude,
      longitude: this.props.location.longitude
    }

    this.setState({
      viewport: {
        latitude: this.props.location.latitude,
        longitude: this.props.location.longitude,
        width: '100vw',
        height: '100vh',
        zoom: 11
      },
      cooldown: localStorage.getItem('cooldown')
    })

    /// ARTWORKS FROM OTHER COMPONENT PROPS
    if (this.props.artNearMe[0]) {
      await getUserLocation(lSLocation)
      console.log('FIRST IF STATEMENT IN CDM', this.props.location.latitude)
      this.setState({
        viewport: {
          latitude: this.props.location.latitude,
          longitude: this.props.location.longitude,
          width: '100vw',
          height: '100vh',
          zoom: 11
        },
        artworks: this.props.artNearMe
      })

      /// MAPS LOCAL STORAGE LAT LONG ARTWORKS TO REDUX STORE
    } else if (
      lSLocation.latitude !== undefined &&
      lSLocation.latitude !== null
    ) {
      console.log('SECOND IF STATEMENT IN CDM')
      try {
        await getUserLocation(lSLocation)
        await getMyLocationArt(lSLocation)

        this.setState({
          viewport: {
            latitude: this.props.location.latitude,
            longitude: this.props.location.longitude,
            width: '100vw',
            height: '100vh',
            zoom: 11
          },
          artworks: this.props.artNearMe
        })
      } catch (error) {
        console.error('could not retrieve all artworks')
      }

      //IF THERE'S NO PROPS, OR LAT LONG IN LS STORAGE, WE GET ALL ARTWORKS
    } else {
      try {
        console.log('THIRD IF STATEMENT IN CDM')
        await this.props.getAllArtWorks()

        this.setState({
          viewport: {
            latitude: this.props.location.latitude,
            longitude: this.props.location.longitude,
            width: '100vw',
            height: '100vh',
            zoom: 11
          },
          artworks: this.props.allArtworks,
          allArtworks: this.props.allArtworks
        })
      } catch (error) {
        console.error('could not retrieve all artworks')
      }
    }
  }

  //THIS ADDS A REFERENCE TO THE MAPBOXGL COMPONENT, FOR THE GEOCODER
  mapRef = React.createRef()

  //THIS HANDLES THE VIEWPORT CHANGE CALLED IN HANDLE GEOCODERVIEWPORT CHANGE//
  //REDUNDANT, BUT SINCE IT'S CALLED INSIDE A FUNCTION, RATHER THAN RENDER MENTHOD, NECESSARY
  // COULD POSSIBLY REFACTOR MAPBOXGL COMPONENT TO CALL *THIS* INSTEAD OF LOGIC IN COMPONENT RENDER
  handleViewportChange = viewport => {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    })
  }

  ///HANDLES VIEWPORT CHANGE ... THERES SOME METHODS WE CAN USE IF THERES OTHER STUFF WE WANNA CHANGE...
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = {transitionDuration: 1000}

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }

  /// THIS TAKES *ONRESULT* FROM GEOCODER COMPONENT IN RENDER, AND CALLS A THUNK W THE NEW SEARCH PROVIDED BY
  // GEOCODER. THEN SETS THE ARTWORKS AND VIEWPOER STUFF ON STATE
  async handleNewSearch(result) {
    const newLocation = {
      latitude: result.result.center[1],
      longitude: result.result.center[0]
    }
    setLSLocation(newLocation)

    try {
      await this.props.getMyLocationArt(newLocation)
      await this.props.getUserLocation(newLocation)
    } catch (error) {
      console.error('could not retrieve all artworks')
    }
    this.setState({
      viewport: {
        latitude: this.props.location.latitude,
        longitude: this.props.location.longitude,
        width: '100vw',
        height: '100vh',
        zoom: 11
      },
      artworks: this.props.artNearMe,
      allArtworks: this.props.allArtworks
    })
    this.handleGeocoderViewportChange(this.state.viewport)
  }

  openModal() {
    this.setState({open: true})
  }
  closeModal() {
    this.setState({open: false})
  }

  render() {
    const window = windowCheck()
    const innerWidth = window.innerWidth
    const art = this.state.viewAll
      ? this.props.allArtworks
      : this.state.artworks

    console.log(this.props)

    return (
      <div>
        <div className="map-container">
          <ReactMapGl
            ref={this.mapRef}
            {...this.state.viewport}
            mapboxApiAccessToken="pk.eyJ1IjoiY2hyb21hdGljYmxhY2siLCJhIjoiY2thOXZ4bmdmMGRzdDJ0bWd2b2JrOHNqYiJ9.mfvYVXS09PgNdRH2SB6Ncg"
            mapStyle="mapbox://styles/chromaticblack/ckamv80kv248t1ipgo4jp5y5k"
            onViewportChange={newport => {
              this.setState({viewport: newport})
            }}
          >
            {/* GEOCODER GOES INSIDE REACTMAPGL, CAN REMOVE INLINE STYLING AND ADD OTHER METHODS */}
            <Geocoder
              mapRef={this.mapRef}
              mapboxApiAccessToken="pk.eyJ1IjoiY2hyb21hdGljYmxhY2siLCJhIjoiY2thOXZ4bmdmMGRzdDJ0bWd2b2JrOHNqYiJ9.mfvYVXS09PgNdRH2SB6Ncg"
              onViewportChange={this.handleGeocoderViewportChange}
              position="top-right"
              onResult={result => this.handleNewSearch(result)}
              zoom={10}
            />

            {/* WE NOW MAP THROUGH OUR STATE TO MAKE THE MARKERS, THE STATE WILL CHANGE FREQUENTLY W NEW SEARCHES AND PASSED PROPS */}
            {/* THIS MAPS USER'S CURRENT LOCATION TO A PIN */}
            {localStorage.getItem('latitude') &&
            localStorage.getItem('longitude') ? (
              <div>
                <Marker
                  latitude={Number(this.props.location.latitude)}
                  longitude={Number(this.props.location.longitude)}
                >
                  <button
                    type="button"
                    // id="marker-pin"
                    id="here-pin"
                    onClick={() => {
                      this.setState({myLocation: true})
                    }}
                  >
                    <img
                      className="location-pin"
                      height="40px"
                      width=""
                      src="https://res.cloudinary.com/dcr8cepdv/image/upload/v1590269279/Raspberry-Lightning-Bolt_hiyje0_4_f12mr4.png"
                    />
                  </button>
                </Marker>
                <Popup
                  latitude={Number(this.props.location.latitude)}
                  longitude={Number(this.props.location.longitude)}
                  open={this.state.myLocation}
                  // onClose = {this.setState({myLocation: false})}
                >
                  {' '}
                  You are here!
                </Popup>
                {/* <Popup
                  latitude={Number(this.props.location.latitude)}
                  longitude={Number(this.props.location.longitude)}
                  open={!!this.props.allArtworks.length && !this.props.artNearMe[0] && !this.state.cooldown}
                  onClose={()=>{
                    localStorage.setItem('cooldown', true)
                    this.setState({cooldown: true})
                    setTimeout(
                      function(){
                        localStorage.removeItem('cooldown')
                      }, 5000
                    )}}
                >
                  Hmm...{' '}
                  <a
                    href="https://www.homedepot.com/b/Paint-Spray-Paint/N-5yc1vZapz5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cheekyPopup"
                  >
                    Seems like there's not much art around here..
                  </a>
                </Popup> */}
              </div>
            ) : (
              ''
            )}
            {/* THIS MAPS ARTWORK TO PINS */}
            {art[0] || this.props.allArtworks[0] ? (
              art.map(artwork => (
                <Marker
                  key={artwork.id}
                  latitude={Number(artwork.Location.latitude)}
                  longitude={Number(artwork.Location.longitude)}
                >
                  <button
                    type="button"
                    id="marker-pin"
                    onClick={ev => {
                      ev.preventDefault()
                      this.setState({selectedPin: artwork.Location})
                      this.openModal()
                    }}
                  >
                    <img
                      className="location-pin"
                      height="40px"
                      width=""
                      src={
                        artwork.Location.latitude ===
                          localStorage.getItem('latitude') &&
                        artwork.Location.longitude ===
                          localStorage.getItem('longitude')
                          ? 'https://res.cloudinary.com/dcr8cepdv/image/upload/v1590269279/Raspberry-Lightning-Bolt_hiyje0_4_f12mr4.png'
                          : 'https://res.cloudinary.com/dcr8cepdv/image/upload/v1590270243/GREEN-Lightning-Bolt-v2_i6kcre.png'
                      }
                    />
                  </button>
                </Marker>
              ))
            ) : (
              <div className="loading">
                <Loading />
              </div>
            )}
            {/** CONDITIONS TO DISPLAY POP UP ON MOBILE AND DESKTOP */}
            {this.state.selectedPin ? (
              <div>
                <Popup
                  className="popup-contaner"
                  open={this.state.open}
                  closeOnDocumentClick
                  latitude={Number(this.state.selectedPin.latitude)}
                  longitude={Number(this.state.selectedPin.longitude)}
                  // CUSTOMIZE STYLING BASE ON REACT_MAP_GL DOC
                  contentStyle={
                    window.innerWidth < 768
                      ? mobileContentStyle
                      : mapPopupDesktopStyle
                  }
                  onClose={() => {
                    this.setState({selectedPin: null})
                    this.closeModal()
                  }}
                >
                  <div>
                    <button
                      type="button"
                      className="close-btn"
                      onClick={() => this.closeModal()}
                    >
                      {' '}
                      &times;
                    </button>
                    {/** INDIVIDUAL ARTWORK FOR EACH PIN BY LOCATION*/}
                    <Artwork
                      latitude={Number(this.state.selectedPin.latitude)}
                      longitude={Number(this.state.selectedPin.longitude)}
                      address={this.state.selectedPin.address}
                    />
                  </div>
                </Popup>
              </div>
            ) : (
              ''
            )}
            {/** CONDITIONS FOR LOADING NAV CONTROLS BASE ON DEVICE */}
            {window.innerWidth > 768 ||
            (window.innerWidth < 768 && this.state.selectedPin === null) ? (
              <div>
                <div id="navegation-control">
                  <NavigationControl />
                </div>
                <div id="fullscreen-control">
                  <FullscreenControl />
                </div>
              </div>
            ) : (
              ''
            )}
          </ReactMapGl>
          {/** BELOW IS POPUP FOR DISPLAY OF ALL ARTWORK */}
          <div id="footer">
            <div id="checkbox">
              <input
                type="checkbox"
                onChange={e => {
                  this.setState({viewAll: !e.target.checked})
                }}
                name="viewAll"
                defaultChecked={true}
              />
              <label htmlFor="viewAll">Only show art near me?</label>
            </div>
            <ArtistListPopup art={art} />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  // ALL ARTWORKS IS FALLBACK IF NO LOCATION IS AVAILABLE
  allArtworks: state.artwork.all,
  // ART NEAR ME IS USED FOR NEW SEARCHES IN GEOCODER
  artNearMe: state.artwork.artNearMe,
  location: state.location
})

const mapDispatch = dispatch => ({
  getAllArtWorks: () => dispatch(fetchAllArtworks()),
  getMyLocationArt: location => dispatch(fetchArtFromMyLocation(location)),
  getUserLocation: location => dispatch(setLocation(location))
})

export default connect(mapState, mapDispatch)(MapView)
