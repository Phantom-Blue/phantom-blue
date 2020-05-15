import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUser} from '../../store/userHome'
import './userHome.css'

export class SingleUserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // this.props.fetchUser(this.props.match.params.id)
    // console.log('this.props.match.params', this.props.match.params)
  }

  render() {
    // console.log('>>>>> this.props:', this.props)
    const user = this.props || {}
    return (
      <div>
        {this.props.user.firstName ? (
          <div className="user-home-container" align="center">
            <br />
            <h2> Welcome, {this.props.user.firstName}! </h2>
            <br />
            <img src={this.props.user.imageUrl} width="100%" />
            <br />
            <div className="saved-artwork">
              <p>Your Artwork</p>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchUser: id => dispatch(fetchUser(id))
})

export default connect(mapState, mapDispatch)(SingleUserHome)
