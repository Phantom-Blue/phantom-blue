import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {connect} from 'react-redux'
// import {} from '../../AllArtWork'
// import {Link} from 'react-router-dom'
import {fetchAllArtworks, removeArtwork} from '../../store/artworks'
import './allArtworks.css'

export class AllArtWorks extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {}
  // this.handleDelete = this.handleDelete.bind(this)
  // }

  componentDidMount() {
    this.props.fetchAllArtworks()
  }

  render() {
    const listOfArtworks = this.props.allArtwork || []
    return (
      <div className="all-artworks-container">
        <h1>All Artworks</h1>
        {listOfArtworks.map(artwork => {
          return (
            <div className="artwork-container" key={artwork.userId}>
              <img src={artwork.imageUrl} alt="Artwork" />
              <h2>{artwork.artist}</h2>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => ({
  AllArtWorks: state.artwork
})

const mapDispatch = dispatch => ({
  fetchAllArtWorks: () => dispatch(fetchAllArtworks),
  removeArtwork: artworkId => dispatch(removeArtwork(artworkId))
})
export default connect(mapState, mapDispatch)(AllArtWorks)
