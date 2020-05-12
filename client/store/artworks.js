/* eslint-disable semi */
/* eslint-disable no-console */

import axios from 'axios'

// A C T I O N   C R E A T O R S //
const GET_AN_ARTWORK = 'GET_AN_ARTWORK'
const VERIFY_ARTWORK = 'VERIFY_ARTWORK'
const ADD_TAGS = 'ADD_TAGS'

// A C T I O N S //
const gotAnArtwork = artwork => ({
  type: GET_AN_ARTWORK,
  artwork
})

const verifiedArtwork = artwork => ({
  type: VERIFY_ARTWORK,
  artwork
})

const taggedArt = artwork => ({
  type: ADD_TAGS,
  artwork
})

// T H U N K S //
export const fetchArtwork = location => async dispatch => {
  try {
    const res = await axios.get('/api/artworks/', location)
    dispatch(gotAnArtwork(res.data))
  } catch (error) {
    console.error("didn't receive any data")
  }
}

export const verifyArtworkInDB = artworkId => async dispatch => {
  try {
    const res = await axios.put(`/api/artworks/${artworkId}`)
    dispatch(verifiedArtwork(res.data))
  } catch (error) {
    console.error("didn't receive any data")
  }
}

export const addTagsToDB = (artworkId, tags) => async dispatch => {
  try {
    const res = await axios.post(`/api/tags/${artworkId}`, tags)
    dispatch(taggedArt(res.data))
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
    case ADD_TAGS:
      return action.artwork
    default:
      return state
  }
}
