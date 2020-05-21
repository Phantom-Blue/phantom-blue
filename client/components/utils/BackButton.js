import React from 'react'

const BackButton = () => {
  return (
    <button
      type="button"
      onClick={() => {
        history.back()
      }}
    >
      Back
    </button>
  )
}

export default BackButton
