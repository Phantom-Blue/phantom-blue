/* eslint-disable complexity */
/* eslint-disable semi */
/* eslint-disable no-console */

import axios from 'axios'
import history from '../history'
import '../../secrets'
import {Location} from '../../server/db/models'

// A C T I O N   C R E A T O R S //
const GET_ART_BY_LOCATION = 'GET_ART_BY_LOCATION'
const GET_ART_FROM_MY_LOCATION = 'GET_ART_FROM_MY_LOCATION'
const GET_ART_BY_LOCATIONID = 'GET_ART_BY_LOCATIONID'
const GET_ONE_ARTWORK = 'GET_ONE_ARTWORK'
const GET_ALL_ARTWORKS = 'GET_ALL_ARTWORKS'
const GET_ALL_VERIFIED = 'GET_ALL_VERIFIED'
const VERIFY_ARTWORK = 'VERIFY_ARTWORK'
const ADD_TAGS = 'ADD_TAGS'
const UPDATE_ARTWORK = 'UPDATE_ARTWORK'
const DELETE_ARTWORK = 'DELETE_ARTWORK'
const POST_ARTWORK = 'POST_ARTWORK'
const CATCH_ERROR = 'CATCH_ERROR'

// A C T I O N S //
const gotArtByLoc = artwork => ({
  type: GET_ART_BY_LOCATION,
  artwork
})

const gotArtByLocId = artwork => ({
  type: GET_ART_BY_LOCATIONID,
  artwork
})

const gotArtFromMyLoc = artwork => ({
  type: GET_ART_FROM_MY_LOCATION,
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

const updatedArtwork = artwork => ({
  type: UPDATE_ARTWORK,
  artwork
})
const gotAllVerified = artwork => ({
  type: GET_ALL_VERIFIED,
  artwork
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

const passError = error => ({
  type: CATCH_ERROR,
  error
})

// T H U N K S //
export const fetchLocationArtwork = (lat, long) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/locations/${lat}?long=${long}`)
    console.log('GOT ARTWORK', data)
    dispatch(gotArtByLoc(data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchArtWorkByLocationId = LocationId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/artworks/artbylocation/${LocationId}`)
    console.log('GOT ARTWORK', data)
    dispatch(gotArtByLocId(data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchArtFromMyLocation = location => async dispatch => {
  const {latitude, longitude} = location
  console.log('INSIDE THUUUNK', latitude, longitude)
  try {
    const {data} = await axios.get(
      `/api/locations/artNearby/10000/${longitude}/${latitude}`
    )
    // console.log('GOT ARTWORK', data)
    dispatch(gotArtFromMyLoc(data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchOneArtwork = artworkId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/artworks/${artworkId}`)
    dispatch(gotArtbyId(data))
  } catch (error) {
    console.error(error)
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
    console.error(error)
  }
}

export const fetchUpdatedArtwork = (
  artworkId,
  artworkInfo
) => async dispatch => {
  let {newImages} = artworkInfo
  try {
    for (let i = 0; i < newImages.length; i++) {
      const url = await axios.post(
        `https://api.cloudinary.com/v1_1/pentimento/upload`,
        {
          file: newImages[i],
          // eslint-disable-next-line camelcase
          upload_preset: 'ea0bwcdh'
        }
      )
      newImages[i] = url.data.secure_url
    }
  } catch (err) {
    console.error(err, 'Unable to upload image.')
    return
  }
  try {
    artworkInfo.imageUrl = [...artworkInfo.imageUrl, ...newImages]
    const {data} = await axios.put(
      `/api/artworks/${artworkId}/edit`,
      artworkInfo
    )
    dispatch(updatedArtwork(data))
  } catch (err) {
    console.error(err, 'UNABLE TO UPDATE')
  }
}
export const fetchAllVerified = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/artworks/verified')
    dispatch(gotAllVerified(data))
  } catch (error) {
    console.error(error, 'unable to fetch verified artworks')
  }
}

export const removeArtwork = artworkId => async dispatch => {
  try {
    await axios.delete(`/api/artworks/${artworkId}`)
    dispatch(deletedArtwork(artworkId))
  } catch (error) {
    console.error(error)
  }
}

export const addTagsToDB = (artworkId, tag) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/tags/${artworkId}`, {tag: tag})
    dispatch(taggedArt(data))
  } catch (error) {
    console.error(error)
  }
}

export const postArtwork = newArt => async dispatch => {
  let res
  try {
    if (newArt.error) {
      return dispatch(passError(newArt.error))
    }
    res = await axios.post('/api/artworks', newArt)
  } catch (error) {
    console.error('Unable to post artwork.')
    return dispatch(passError(error))
  }

  try {
    dispatch(postedArtwork(res.data))
    const location = await Location.findByPk(res.data.LocationId)
    const feature = location.convertToGo()
    await axios.put(
      `https://api.mapbox.com/datasets/v1/mstykmshy/ckaejyuag0g6u22pnkxura0z0/features/${
        location.id
      }?access_token=${process.env.MAPBOX_DATA_KEY}`,
      feature
    )
    history.push('/map')
  } catch (error) {
    console.error(error)
  }
}

// I N I T I A L   S T A T E //
const initialState = {
  all: [],
  selected: {},
  artByLocation: [],
  artNearMe: [],
  error: null,
  verified: []
}

// R E D U C E R //
// eslint-disable-next-line complexity
export default function artworkReducer(state = initialState, action) {
  switch (action.type) {
    case CATCH_ERROR:
      return {...state, error: action.error}
    case GET_ART_BY_LOCATION:
      return {...state, artByLocation: action.artwork}
    case GET_ART_BY_LOCATIONID:
      return {...state, artByLocation: action.artwork}
    case GET_ART_FROM_MY_LOCATION:
      return {...state, artNearMe: action.artwork}
    case GET_ONE_ARTWORK:
      return {...state, selected: action.artwork}
    case GET_ALL_ARTWORKS:
      return {...state, all: action.artwork}
    case VERIFY_ARTWORK:
      return {...state, selected: action.artwork}
    case UPDATE_ARTWORK:
      return {...state, selected: action.artwork}
    case GET_ALL_VERIFIED:
      return {...state, verified: action.artwork}
    case ADD_TAGS:
      return {...state, selected: action.artwork}
    case DELETE_ARTWORK:
      return {
        ...state,
        all: state.all.filter(artwork => artwork.id !== action.id),
        selected: {}
      }
    case POST_ARTWORK:
      return {...state, all: [...state.all, action.artwork]}
    default:
      return state
  }
}
