import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'
import './navbar.css'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.menuIcon = React.createRef()
    this.menuItems = React.createRef()

    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  handleMenuClick() {
    const {innerWidth} = window

    if (innerWidth <= 768) {
      if (this.menuItems.current.style.display === 'flex') {
        this.menuItems.current.style.display = 'none'
      } else {
        this.menuItems.current.style.display = 'flex'
      }
    }
  }
  render() {
    const {isLoggedIn, handleClick} = this.props
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
                ref={this.menuIcon}
                onClick={e => {
                  this.handleMenuClick(e)
                }}
              >
                <div />
                <div />
                <div />
              </div>
              <div className="sub-links" ref={this.menuItems}>
                <Link to="/upload">Upload Art</Link>
                <Link to="/map">Map</Link>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
                <Link to="/account">Account</Link>
              </div>
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
                ref={this.menuIcon}
                onClick={e => {
                  this.handleMenuClick(e)
                }}
              >
                <div />
                <div />
                <div />
              </div>
              <div className="sub-links" ref={this.menuItems}>
                <Link to="/login">Upload Art</Link>
                <Link to="/map">Map</Link>
                <Link to="/login">Login</Link>
              </div>
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
