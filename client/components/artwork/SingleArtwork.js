import React from 'react'
import {connect} from 'react-redux'
import ArtworkOptions from './ArtworkOptions'
import {fetchOneArtwork} from '../../store/artworks'
import './artwork.css'

class SingleArtwork extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //   options: false,
    }
    // this.handleOptions = this.handleOptions.bind(this)
  }

  componentDidMount() {
    this.props.getOneArtwork(this.props.match.params.id)
  }

  //   handleOptions() {
  //     const {options} = this.state
  //     this.setState({
  //       options: !options
  //     })
  //   }

  render() {
    console.log(this.props)
    const {options} = this.state
    const {artwork} = this.props

    return (
      <div>
        <img src={artwork.imageUrl} alt={artwork.artist} width="200" />
        <div className="carousel-text">
          <h1 className="artistname">{artwork.artist}</h1>
          <div>
            <button
              type="button"
              className="historybutton"
              // onClick={this.handleOptions}
            >
              <img
                src="http://www.gisellezatonyl.com/WRONGSmall/Assets/Images/arrowD.png"
                alt="down button"
                width="15"
              />
            </button>
            <ArtworkOptions artwork={artwork} />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  artwork: state.artwork
})

const mapDispatch = dispatch => ({
  getOneArtwork: artworkId => dispatch(fetchOneArtwork(artworkId))
})

export default connect(mapState, mapDispatch)(SingleArtwork)
