/* eslint-disable complexity */
/* eslint-disable semi */
/* eslint-disable no-console */

import axios from 'axios'

// A C T I O N   C R E A T O R S //
const GET_ART_BY_LOCATION = 'GET_ART_BY_LOCATION'
const GET_ONE_ARTWORK = 'GET_ONE_ARTWORK'
const GET_ALL_ARTWORKS = 'GET_ALL_ARTWORKS'
const VERIFY_ARTWORK = 'VERIFY_ARTWORK'
const ADD_TAGS = 'ADD_TAGS'
const UPDATE_ARTWORK = 'UPDATE_ARTWORK'
const DELETE_ARTWORK = 'DELETE_ARTWORK'
const POST_ARTWORK = 'POST_ARTWORK'

// A C T I O N S //
const gotArtByLoc = artwork => ({
  type: GET_ART_BY_LOCATION,
  artwork
})

const gotArtbyId = artwork => ({
  type: GET_ONE_ARTWORK,
  artwork
})

const gotAllArtworks = artwork => ({
  type: GET_ALL_ARTWORKS,
  artwork
})

const verifiedArtwork = artwork => ({
  type: VERIFY_ARTWORK,
  artwork
})

const updatedArtwork = artworkUpdated => ({
  type: UPDATE_ARTWORK,
  artworkUpdated
})
const deletedArtwork = id => ({
  type: DELETE_ARTWORK,
  id
})

const taggedArt = artwork => ({
  type: ADD_TAGS,
  artwork
})

const postedArtwork = artwork => ({
  type: POST_ARTWORK,
  artwork
})

// T H U N K S //
export const fetchLocationArtwork = (lat, long) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/locations/${lat}?long=${long}`)
    console.log('GOT ARTWORK', data)
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

export const fetchUpdatedArtwork = (
  artworkId,
  artworkInfo
) => async dispatch => {
  try {
    const {data} = await axios.put(
      `/api/artworks/${artworkId}/edit`,
      artworkInfo
    )
    dispatch(updatedArtwork(data))
  } catch (err) {
    console.error(err, 'UNABLE TO UPDATE')
  }
}
export const removeArtwork = artworkId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/artworks/${artworkId}`)
    dispatch(deletedArtwork(artworkId))
  } catch (error) {
    console.error("didn't receive any data")
  }
}

export const addTagsToDB = (artworkId, tag) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/tags/${artworkId}`, {tag: tag})
    dispatch(taggedArt(data))
  } catch (error) {
    console.error("didn't receive any data")
  }
}

export const postArtwork = newArt => async dispatch => {
  try {
    const {data} = await axios.post('/api/artworks', newArt)
    dispatch(postedArtwork(data))
  } catch (error) {
    console.error('Unable to post artwork.')
  }
}

// I N I T I A L   S T A T E //
const initialState = {
  all: [],
  selected: {}
}

// R E D U C E R //
export default function artworkReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ART_BY_LOCATION:
      return {...state, selected: action.artwork}
    case GET_ONE_ARTWORK:
      return {...state, selected: action.artwork}
    case GET_ALL_ARTWORKS:
      return {...state, all: action.artwork}
    case VERIFY_ARTWORK:
      return {...state, selected: action.artwork}
    case UPDATE_ARTWORK:
      return state.all.map(artwork => {
        if (artwork.id === action.artworkUpdated.id) {
          return action.artworkUpdated
        } else {
          return action.artwork
        }
      })
    case ADD_TAGS:
      return {...state, selected: action.artwork}
    case DELETE_ARTWORK:
      return action.artworks.filter(artwork => artwork.id !== action.id)
    case POST_ARTWORK:
      return {...state, all: [...state.all, action.artwork]}
    default:
      return state
  }
}
