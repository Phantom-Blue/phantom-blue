import React from 'react'
import {connect} from 'react-redux'
import {fetchArtWorkByLocationId} from '../../store/artworks'
import {generateUrl} from './utils'
import Popup from 'reactjs-popup'
import './artwork.css'
import {Link} from 'react-router-dom'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

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
                          <img src={artwork.imageUrl} alt={artwork.artist} />
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
                          <ButtonBack>Back</ButtonBack>
                          <ButtonNext>Next</ButtonNext>
                        </div>
                      </center>
                    </Slide>
                  ))}
                </Slider>
              </div>
            </CarouselProvider>
          </div>
        ) : (
          <div>
            <center>
              <h2>L O A D I N G . . .</h2>
              <img
                src="http://gisellezatonyl.com/images/blobbers-03-newalgos-12-23-13-02-lessframes-600pxw.gif"
                width="300"
              />
            </center>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  artworks: state.artwork.selected
})

const mapDispatch = dispatch => ({
  getArtworkByLocId: locationId =>
    dispatch(fetchArtWorkByLocationId(locationId))
})

export default connect(mapState, mapDispatch)(LocationArtwork)
