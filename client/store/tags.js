/* eslint-disable semi */
/* eslint-disable no-console */

import axios from 'axios'

// A C T I O N   C R E A T O R S //
const ADD_TAGS = 'ADD_TAGS'

// A C T I O N S //
const taggedArt = artwork => ({
  type: ADD_TAGS,
  artwork
})

// T H U N K S //
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
export default function tagReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TAGS:
      return action.artwork
    default:
      return state
  }
}
