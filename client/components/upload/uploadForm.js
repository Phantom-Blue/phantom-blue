import React from 'react'
import {connect} from 'react-redux'
import {postArtwork} from '../../store/artworks'

export class UploadForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      imageUrl: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit() {
    this.props.postArtwork(this.state)
  }

  render() {
    const handleChange = this.handleChange
    const handleSubmit = this.handleSubmit
    return (
      <form>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          value={this.state.name}
          name="name"
          onChange={e => {
            handleChange(e)
          }}
        />
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          value={this.state.description}
          name="description"
          onChange={e => {
            handleChange(e)
          }}
        />
        <label htmlFor="imageUrl">Image URL: </label>
        <input
          type="text"
          value={this.state.imageUrl}
          name="imageUrl"
          onChange={e => {
            handleChange(e)
          }}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit!
        </button>
      </form>
    )
  }
}

const mapState = state => ({})

const mapDispatch = dispatch => ({
  postArtwork: state => {
    dispatch(postArtwork(state))
  }
})

export default connect(mapState, mapDispatch)(UploadForm)
