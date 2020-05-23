import React from 'react'

// BUTTON STYLE
const backButtonStyle = {
  border: 'none',
  backgroundColor: 'white',
  borderRadius: '20px',
  cursor: 'pointer',
  color: 'black',
  fontWeight: '400',
  fontSize: '20px',
  marginTop: '20px',
  textAlign: 'left',
  padding: '10px 0'
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
      &#8249; BACK
    </button>
  )
}

export default BackButton
