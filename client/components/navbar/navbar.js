import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'
import './navbar.css'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }

    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    const {innerWidth} = window

    if (innerWidth < 768) {
      this.setState({visible: !this.state.visible})
    }
  }
  render() {
    const {isLoggedIn, handleClick} = this.props
    const {innerWidth} = window
    return (
      <div>
        <nav>
          {isLoggedIn ? (
            <div className="nav-links">
              {/* The navbar will show these links after you log in */}
              <div className="main-link">
                <Link to="/">PENTIMENTO</Link>
              </div>
              {/**Mobile menu bar */}
              <div
                className="menu-icon"
                onClick={e => {
                  this.toggleMenu(e)
                }}
              >
                <div />
                <div />
                <div />
              </div>
              {this.state.visible && (
                <div className="sub-links">
                  <Link to="/upload">Upload Art</Link>
                  <Link to="/map">Map</Link>
                  <a href="#" onClick={handleClick}>
                    Logout
                  </a>
                  <Link to="/account">Account</Link>
                </div>
              )}
              {/** DESKTOP */}
              {innerWidth > 768 ? (
                <div className="sub-links">
                  <Link to="/upload">Upload Art</Link>
                  <Link to="/map">Map</Link>
                  <a href="#" onClick={handleClick}>
                    Logout
                  </a>
                  <Link to="/account">Account</Link>
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            <div className="nav-links">
              {/* The navbar will show these links before you log in */}
              <div className="main-link">
                <Link to="/">PENTIMENTO</Link>
              </div>
              {/**Mobile menu bar */}
              <div
                className="menu-icon"
                onClick={e => {
                  this.toggleMenu(e)
                }}
              >
                <div />
                <div />
                <div />
              </div>
              {/** MOBILE TOGGLE */}
              {this.state.visible && (
                <div className="sub-links">
                  <Link to="/login">Upload Art</Link>
                  <Link to="/map">Map</Link>
                  <Link to="/login">Login</Link>
                </div>
              )}
              {/** DESKTOP */}
              {innerWidth > 768 ? (
                <div className="sub-links">
                  <Link to="/login">Upload Art</Link>
                  <Link to="/map">Map</Link>
                  <Link to="/login">Login</Link>
                </div>
              ) : (
                ''
              )}
            </div>
          )}
        </nav>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
