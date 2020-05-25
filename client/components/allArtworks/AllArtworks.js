import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllArtworks} from '../../store/artworks'
import './allArtworks.css'
import Loading from '../utils/Loading'

export class AllArtWorks extends Component {
  componentDidMount() {
    this.props.getAllArtWorks()
  }

  render() {
    const {allArtWorks} = this.props
    return (
      <div className="all-artworks-container">
        <div>
          {allArtWorks ? (
            allArtWorks.map(artwork => {
              return (
                <div className="artwork-container" key={artwork.id}>
                  <Link to={`/artwork/${artwork.id}`}>
                    <img
                      id="view-as-list-img"
                      src={artwork.imageUrl[0]}
                      alt="Artwork Image"
                    />
                    <h2>{artwork.artist}</h2>
                  </Link>
                </div>
              )
            })
          ) : (
            <Loading />
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  allArtWorks: state.artwork.all
})

const mapDispatch = dispatch => ({
  getAllArtWorks: () => dispatch(fetchAllArtworks())
})

export default connect(mapState, mapDispatch)(AllArtWorks)
