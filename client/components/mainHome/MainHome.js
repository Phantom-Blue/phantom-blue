/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
import React from 'react'
import {connect} from 'react-redux'
import {fetchAllVerified} from '../../store/artworks'
import {generateUrl} from '../artwork/utils'
import './mainHome.css'
import {Link} from 'react-router-dom'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

class MainHome extends React.Component {
  componentDidMount() {
    this.props.getVerifiedArtwork()
  }

  render() {
    console.log(this.props.artworks, 'INSIDE MAIN HOME RENDERRRRRRRRR')
    return (
      <div>
        {this.props.artworks[0] ? (
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={this.props.artworks.length}
          >
            <Slider>
              {this.props.artworks.map((artwork, i) => (
                <Slide index={i} key={artwork.id} className="carousel-image">
                  <img src={artwork.imageUrl[0]} width="300" />
                  <Link to={`/artwork/${artwork.id}`}>
                    <button type="button">
                      <div>
                        <h4>{artwork.artist}</h4>
                      </div>
                      <div>
                        <p>{artwork.description}</p>
                      </div>
                    </button>
                  </Link>
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
    )
  }
}

const mapState = state => ({
  artworks: state.artwork.verified
})

const mapDispatch = dispatch => ({
  getVerifiedArtwork: () => dispatch(fetchAllVerified())
})

export default connect(mapState, mapDispatch)(MainHome)
