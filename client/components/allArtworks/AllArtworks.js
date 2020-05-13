import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {fetchAllArtworks} from '../../store/artworks'
import './allArtworks.css'

export class AllArtWorks extends Component {
  componentDidMount() {
    this.props.getAllArtWorks()
  }

  render() {
    const {allArtWorks} = this.props
    console.log(allArtWorks)
    return (
      <div className="all-artworks-container">
        <div>
          {allArtWorks
            ? allArtWorks.map(artwork => {
                return (
                  <div className="artwork-container" key={artwork.userId}>
                    <img src={artwork.imageUrl} alt="Artwork" />
                    <h2>{artwork.artist}</h2>
                  </div>
                )
              })
            : 'No Artworks at this location'}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    allArtWorks: state.artwork
  }
}

const mapDispatch = dispatch => ({
  getAllArtWorks: () => dispatch(fetchAllArtworks())
})

export default connect(mapState, mapDispatch)(AllArtWorks)
