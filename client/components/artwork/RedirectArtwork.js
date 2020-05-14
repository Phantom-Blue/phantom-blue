import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import './artwork.css'
import AllArtworks from '../allArtworks/AllArtworks'

const RedirectArtwork = props => {
  return props.artwork.id ? (
    <Redirect to={`/artwork/${props.artworkId}`} />
  ) : (
    <div>
      <Redirect to="/all" />
    </div>
  )
}

export default RedirectArtwork
