/* eslint-disable no-unused-vars */
import axios from 'axios'
import {storeLocation, retrieveLocation} from '../components/utils/localstorage'

const SET_LOCATION = 'SET_LOCATION'

export const putLocation = location => ({
  type: SET_LOCATION,
  latitude: location.latitude,
  longitude: location.longitude
})

export const syncLocation = () => dispatch => {
  const location = retrieveLocation()
  if (location.latitude && location.longitude) {
    dispatch(putLocation(location))
  }
}

export const setLocation = location => dispatch => {
  try {
    dispatch(putLocation(location))
  } catch (err) {
    return console.error(err)
  }
  storeLocation(location)
}

const initialState = {
  latitude: 40.7736,
  longitude: -73.9566
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {...state, latitude: action.latitude, longitude: action.longitude}
    default:
      return state
  }
}

export default reducer
