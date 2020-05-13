/* eslint-disable semi */
/* eslint-disable no-console */

import axios from 'axios'

// A C T I O N   C R E A T O R S //
const GET_ART_BY_LOCATION = 'GET_ART_BY_LOCATION'
const GET_ONE_ARTWORK = 'GET_ONE_ARTWORK'
const GET_ALL_ARTWORKS = 'GET_ALL_ARTWORKS'
const VERIFY_ARTWORK = 'VERIFY_ARTWORK'
const ADD_TAGS = 'ADD_TAGS'
const DELETE_ARTWORK = 'DELETE_ARTWORK'

// A C T I O N S //
const gotArtByLoc = artworks => ({
  type: GET_ART_BY_LOCATION,
  artworks
})

const gotArtbyId = artworks => ({
  type: GET_ONE_ARTWORK,
  artworks
})

const gotAllArtworks = artworks => ({
  type: GET_ALL_ARTWORKS,
  artworks
})

const verifiedArtwork = artworks => ({
  type: VERIFY_ARTWORK,
  artworks
})

const deletedArtwork = artworks => ({
  type: DELETE_ARTWORK,
  artworks
})

const taggedArt = artworks => ({
  type: ADD_TAGS,
  artworks
})

// T H U N K S //
export const fetchLocationArtwork = (lat, long) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/locations/${lat}?long=${long}`)
    dispatch(gotArtByLoc(data))
  } catch (error) {
    console.error("didn't receive any data")
  }
}

export const fetchOneArtwork = artworkId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/artworks/${artworkId}`)
    dispatch(gotArtbyId(data))
  } catch (error) {
    console.error("didn't receive any data")
  }
}

export const fetchAllArtworks = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/artworks')
    dispatch(gotAllArtworks(data))
  } catch (error) {
    console.error(error, 'UNABLE TO FETCH ALL ARTWORKS')
  }
}

export const verifyArtworkInDB = artworkId => async dispatch => {
  try {
    const {data} = await axios.put(`/api/artworks/${artworkId}`)
    dispatch(verifiedArtwork(data))
  } catch (error) {
    console.error("didn't receive any data")
  }
}

export const removeArtwork = artworkId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/artworks/${artworkId}`)
    dispatch(deletedArtwork(data))
  } catch (error) {
    console.error("didn't receive any data")
  }
}

export const addTagsToDB = (artworkId, tag) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/tags/${artworkId}`, tag)
    dispatch(taggedArt(data))
  } catch (error) {
    console.error("didn't receive any data")
  }
}

// I N I T I A L   S T A T E //
const initialState = []

// R E D U C E R //
export default function artworkReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ART_BY_LOCATION:
      return action.artworks
    case GET_ONE_ARTWORK:
      return action.artworks
    case GET_ALL_ARTWORKS:
      return action.artworks
    case VERIFY_ARTWORK:
      return action.artworks
    case ADD_TAGS:
      return action.artworks
    case DELETE_ARTWORK:
      return action.artworks.filter(artwork => artwork.id !== action.id)
    default:
      return state
  }
}
