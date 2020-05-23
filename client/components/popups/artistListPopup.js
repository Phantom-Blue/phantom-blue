import React from 'react'
import Popup from 'reactjs-popup'
import AllArtworks from '../allArtworks/AllArtworks'
import {Link} from 'react-router-dom'
// customize popup style
import {mobileAllArtworksStyle} from './style/popupStyle'
import './style/artistListPopup.css'
import {windowCheck} from '../utils/utils'

const artistListPopup = () => {
  const window = windowCheck()
  const innerWidth = window.innerWidth

  return (
    <div className="artwork-list-outer-container">
      <Popup
        trigger={
          <div className="see-all-artworks-link-container">
            <Link to="/map" id="link-to-all-artworks">
              View as list
            </Link>
          </div>
        }
        modal
        closeOnDocumentClick
        contentStyle={innerWidth < 768 ? mobileAllArtworksStyle : ''}
      >
        {close => (
          <div className="modal">
            <a className="close" onClick={close}>
              &times;
            </a>
            <div className="content">
              <AllArtworks />
            </div>
          </div>
        )}
      </Popup>
    </div>
  )
}
export default artistListPopup
