import React, {Component} from 'react'
// import { connect } from 'react-redux'
// import {connect} from 'react-redux'
// import {} from '../../AllArtWork'
// import {Link} from 'react-router-dom'
// import {fetchAllArtworks} from '../../store/artworks'
import './allArtworks.css'

// Dummy data testing purposes
const listOfArtworks = [
  {
    userId: 1,
    artist: 'Dondi',
    imageUrl:
      'https://d2jv9003bew7ag.cloudfront.net/uploads/Dondi-White-Children-of-the-Grave-part-Three.-Photo-Martha-Cooper-865x577.jpg',
    description: 'Tagged Dondi',
    location: '2441 Boston Rd, The Bronx, NY 10467',
    locationId: 1,
    isVerified: false
  },
  {
    userId: 2,
    artist: 'Kaws',
    imageUrl:
      'https://4.bp.blogspot.com/-3gN-jNMFbSY/Uh_tBaWyIYI/AAAAAAAACHA/RbEfnWpAW4g/s1600/streetartnews_kaws_nyc_usa-5.jpeg',
    description: 'Tagged Kaws',
    location: '2441 Boston Rd, The Bronx, NY 10467',
    locationId: 2,
    isVerified: false
  },
  {
    userId: 3,
    artist: 'Unknown',
    imageUrl:
      'https://network9.biz/wp-content/uploads/2019/04/Hearts_0011_Layer-5.jpg',
    description: 'Tagged Unknown 3',
    location: '2441 Boston Rd, The Bronx, NY 10467',
    locationId: 3,
    isVerified: false
  }
]

export default class AllArtWorks extends Component {
  // componentDidMount(){
  //   this.props.getAllArtworks()
  // }

  render() {
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

// const mapState = () => ({
//   AllArtWorks: state.artwork.all
// })

// const mapDispatch = () => ({
//   getAllArtWorks: () => dispatch(fetchAllArtworks)
// })
// export default connect(mapState, mapDispatch)(AllArtWorks)
