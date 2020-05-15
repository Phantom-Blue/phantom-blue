/* eslint-disable semi */
/* eslint-disable no-console */

import axios from 'axios'

// A C T I O N   C R E A T O R S //
const GET_ONE_USER = 'GET_ONE_USER'
const GET_ALL_USERS = 'GET_ALL_USERS'
const DELETE_USER = 'DELETE_USER'

// A C T I O N S //

const gotUser = user => ({
  type: GET_ONE_USER,
  user
})

const gotAllUsers = users => ({
  type: GET_ALL_USERS,
  users
})

const deletedUser = id => ({
  type: DELETE_USER,
  id
})

// T H U N K S //

export const fetchUser = userId => async dispatch => {
  try {
    console.log('userId', userId)
    const {data} = await axios.get(`/api/users/${userId}`)
    console.log('data: ', data)
    dispatch(gotUser(data))
  } catch (error) {
    console.error("didn't receive any data")
  }
}

export const fetchAllUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(gotAllUsers(data))
  } catch (error) {
    console.error(error, "Didn't receive any Data")
  }
}

export const removeUser = userId => async dispatch => {
  try {
    await axios.delete(`/api/users/${userId}`)
    dispatch(deletedUser(userId))
  } catch (error) {
    console.error("didn't receive any data")
  }
}

// I N I T I A L   S T A T E //
const initialState = {
  all: [],
  selected: {}
}

// R E D U C E R //
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ONE_USER:
      return {...state, selected: action.singleUser}
    case GET_ALL_USERS:
      return {...state, all: action.singleUser}
    case DELETE_USER:
      return action.singleUsers.filter(
        singleUser => singleUser.id !== action.id
      )

    default:
      return state
  }
}
