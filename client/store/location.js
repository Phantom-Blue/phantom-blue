/* eslint-disable no-unused-vars */
import axios from 'axios'

const SET_LOCATION = 'SET_LOCATION'

export const setLocation = location => ({
  type: SET_LOCATION,
  latitude: location.latitude,
  longitude: location.longitude
})

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
