/* eslint-disable semi */
/* eslint-disable no-console */

import axios from 'axios';

// A C T I O N   C R E A T O R S //
const GET_AN_ARTWORK = 'GET_AN_ARTWORK'
const VERIFY_ARTWORK = 'VERIFY_ARTWORK'


// A C T I O N S //
const gotAnArtwork = artwork => (
  {
    type: GET_AN_ARTWORK,
    artwork,
  }
)

const verifiedArtwork = artwork => (
  {
    type: VERIFY_ARTWORK,
    artwork,
  }
);

// T H U N K S //
export const fetchArtwork = location => async (dispatch) => {
  try {
    const res = await axios.get(`/api/artworks/`, location)
    dispatch(gotAnArtwork(res.data.artwork))
  } catch (error) {
    console.error("didn't receive any data")
  }
}

export const verifyArtworkInDB = artworkId => async (dispatch) => {
  try {
    const res = await axios.update(`/api/artworks/${artworkId}`)
    dispatch(verifiedArtwork(res.data))
  } catch (error) {
    console.error("didn't receive any data")
  }
}

// I N I T I A L   S T A T E //
const initialState = {}


// R E D U C E R //
export default function artworkReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AN_ARTWORK:
      return action.artwork
    case VERIFY_ARTWORK:
      return action.artwork
    default:
      return state
  }
}
