import React from 'react'
import Popup from 'reactjs-popup'
import AllArtworks from '../allArtworks/AllArtworks'
import {Link} from 'react-router-dom'
// customize popup style
import {
  viewAsAListPopupMobile,
  viewAsAListPopupDesktop
} from './style/popupStyle'
import './style/artistListPopup.css'
import {windowCheck} from '../utils/utils'

const artistListPopup = props => {
  const window = windowCheck()
  const innerWidth = window.innerWidth
  const {art} = props

  return (
    <div className="artwork-list-outer-container">
      <Popup
        className="popup-contaner"
        trigger={
          <div className="see-all-artworks-link-container">
            <Link to="/map" id="link-to-all-artworks">
              View as list
            </Link>
          </div>
        }
        modal
        closeOnDocumentClick
        contentStyle={
          innerWidth < 768 ? viewAsAListPopupMobile : viewAsAListPopupDesktop
        }
      >
        {close => (
          <div className="custome-modal">
            <a className="close" onClick={close}>
              &times;
            </a>
            <AllArtworks art={art} />
          </div>
        )}
      </Popup>
    </div>
  )
}

export default artistListPopup
