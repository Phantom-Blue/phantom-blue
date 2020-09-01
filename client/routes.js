import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UploadPage} from './components'
import MainHome from './components/mainHome/MainHome'
import AllArtworks from './components/allArtworks/AllArtworks'
import SingleArtwork from './components/artwork/SingleArtwork'
import {me} from './store'
import UpdateArtworkForm from './components/updateArtworkForm/UpdateArtworkForm.js'
import MapView from './components/mapView/MapView'
import SingleUserHome from './components/userHome/userHome'
import LocationArtwork from './components/artwork/LocationArtwork'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={MainHome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/map" component={MapView} />
        {/**REVISIT PATH NAME CONVENTION */}
        <Route exact path="/artwork/:id" component={SingleArtwork} />
        <Route exact path="/map" component={MapView} />
        <Route exact path="/location/:id" component={LocationArtwork} />
        <Route exact path="/all" component={AllArtworks} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/account" component={SingleUserHome} />
            <Route exact path="/" component={MainHome} />
            {/** TODO: replace component on route below with upload Art component */}
            <Route path="/upload" component={UploadPage} />
            <Route
              exact
              path="/artwork/:id/edit"
              component={UpdateArtworkForm}
            />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
