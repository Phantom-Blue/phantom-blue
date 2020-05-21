import React from 'react'

// BUTTON STYLE
const backButtonStyle = {
  border: 'none',
  backgroundColor: 'white',
  borderRadius: '20px',
  cursor: 'pointer',
  color: 'black',
  fontSize: '20px',
  marginTop: '20px',
  textAlign: 'left'
}

const BackButton = () => {
  return (
    <button
      type="button"
      style={backButtonStyle}
      onClick={() => {
        history.back()
      }}
    >
      BACK
    </button>
  )
}

export default BackButton
