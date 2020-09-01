/* eslint-disable no-unused-vars */
import React from 'react'
import UploadForm from './uploadForm'

export const UploadPage = props => {
  return (
    <div>
      <UploadForm history={props.history} />
    </div>
  )
}
