import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {updateArtwork, fetchSingleArtwork} from '../../store/artworks'

export class UpdateArtworkForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // updateArtist: 'replace with curr props',
      // updateDescription: 'replace with curr props',
      // updateImageUrl: 'replace with curr props'
    }

    // this.handleChange = this.handleChange.bind(this)
    // this.handleUpdate = this.handleUpdate.bind(this)
  }

  // handleChange(e) {
  //   // this.setState({
  //   //   [e.target.name]: e.target.value
  //   // })
  // }
  // handleUpdate(e, newArtWorkId) {
  //   e.preventDefault()
  //   // const newArtworkInfo = {
  //   //   artist: this.state.updateArtist,
  //   //   description: this.state.updateDescription,
  //   //   imageUrl: this.state.imageUrl
  //   // }
  //   // use updateArtwork from store
  // }

  render() {
    return (
      <div className="update-form-container">
        <h1>Update Artwork</h1>
        <div>
          <input
            type="text"
            name="updateArtist"
            placeholder="Artist name"
            // onChange={e => this.handleChange(e)}
          />
        </div>
        <div>
          <textarea
            type="text"
            name="updateDescription"
            placeholder="Description"
            // onChange={e => this.handleChange(e)}
          />
        </div>
        <div>
          <input
            type="file"
            name="updateImageUrl"
            // onChange={e => this.handleChange(e)}
          />
        </div>
        <div>
          <button id="update-artwork-btn" type="submit">
            Update Artwork
          </button>
        </div>
      </div>
    )
  }
}

// const mapState = state => {
//   return {
//     artwork: state.artwork
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleUpdateArtwork: (artworkId, artworkUpdatedInfo) => {
//       dispatch(updateArtwork(artworkId, artworkUpdatedInfo))
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(UpdateArtworkForm)

export default UpdateArtworkForm
