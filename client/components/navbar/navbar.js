import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'
import './navbar.css'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.menuItems = React.createRef()

    this.openNav = this.openNav.bind(this)
    this.closeNav = this.closeNav.bind(this)
  }

  openNav() {
    const {innerWidth} = window
    if (innerWidth < 768) {
      this.menuItems.current.style.width = '100%'
    }
  }
  closeNav() {
    const {innerWidth} = window
    if (innerWidth < 768) {
      this.menuItems.current.style.width = '0%'
    }
  }

  render() {
    const {isLoggedIn, handleClick} = this.props

    return (
      <div>
        <nav>
          <div className="nav-links">
            <div className="main-link">
              <Link to="/">PENTIMENTO</Link>
            </div>
            {/**Mobile menu bar */}
            <div className="menu-icon" onClick={() => this.openNav()}>
              <div />
              <div />
              <div />
            </div>
            <div className="sub-links-overlay" ref={this.menuItems}>
              <a href="#" className="closebtn" onClick={() => this.closeNav()}>
                &times;
              </a>
              <div className="sub-links" onClick={() => this.closeNav()}>
                {isLoggedIn ? (
                  <div>
                    <Link to="/upload">Upload Art</Link>
                    <Link to="/map">Map</Link>
                    <a href="#" onClick={handleClick}>
                      Logout
                    </a>
                    <Link to="/account">Account</Link>
                  </div>
                ) : (
                  <div>
                    <Link to="/login">Upload Art</Link>
                    <Link to="/map">Map</Link>
                    <Link to="/login">Login</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
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
