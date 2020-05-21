/* eslint-disable no-unused-vars */
import React from 'react'
import {connect} from 'react-redux'
import UploadForm from './uploadForm'

export const UploadPage = props => {
  return (
    <div>
      <UploadForm history={props.history} />
    </div>
  )
}

// const mapState = state => ({})

// const mapDispatch = dispatch => ({})

// export default connect(mapState, mapDispatch)(UploadPage)
