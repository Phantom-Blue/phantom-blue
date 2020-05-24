import React from 'react'
import {connect} from 'react-redux'
import {fetchArtWorkByLocationId} from '../../store/artworks'
import './style/artwork.css'
import {Link} from 'react-router-dom'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import Loading from '../utils/Loading'
import './style/locationArtwork.css'

class LocationArtwork extends React.Component {
  componentDidMount() {
    const {getArtworkByLocId, match} = this.props
    getArtworkByLocId(match.params.id)
  }

  render() {
    return (
      <div>
        {// HERE WE INCOORPORATE A CAROUSEL //
        this.props.artworks[0] ? (
          <div>
            <CarouselProvider
              naturalSlideWidth={100}
              naturalSlideHeight={125}
              totalSlides={this.props.artworks.length}
              infinite={true}
            >
              <div>
                <Slider id="carousel">
                  {this.props.artworks.map((artwork, i) => (
                    <Slide
                      index={i}
                      key={artwork.id}
                      className="carousel-image"
                    >
                      <center>
                        <Link to={`/artwork/${artwork.id}`} key={artwork.id}>
                          <img
                            src={artwork.imageUrl}
                            alt={artwork.artist}
                            className="carousel-img"
                          />
                          <h5 className="artistname">{artwork.artist}</h5>
                        </Link>
                        <div>
                          {/* <a
                            href={generateUrl(
                              artwork.Location.address
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <h4>TAKE ME THERE</h4>
                          </a> */}
                        </div>
                      </center>
                    </Slide>
                  ))}
                </Slider>
              </div>
              <div id="nav-buttons">
                <ButtonBack>
                  <img className="arrow" src="/back_arrow.jpeg" />
                </ButtonBack>
                <ButtonNext>
                  <img className="arrow" src="/forward_arrow.jpeg" />
                </ButtonNext>
              </div>
            </CarouselProvider>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}

const mapState = state => ({
  artworks: state.artwork.artByLocation
})

const mapDispatch = dispatch => ({
  getArtworkByLocId: locationId =>
    dispatch(fetchArtWorkByLocationId(locationId))
})

export default connect(mapState, mapDispatch)(LocationArtwork)
