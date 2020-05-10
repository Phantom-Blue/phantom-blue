import axios from 'axios';

const GET_AN_ARTWORK = 'GET_AN_ARTWORK';

const initialState = {};

const gotAnArtwork = artwork => (
  {
    type: GET_AN_ARTWORK,
    artwork,
  }
);

export const fetchArtwork = location => async (dispatch) => {
  try {
    const res = await axios.get(`/api/artworks/${location}`);
    dispatch(gotAnArtwork(res.data.artwork));
  } catch (error) {
    console.error("didn't receive any data");
  }
};

export default function artworkReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AN_ARTWORK:
      return action.artwork;
    default:
      return state;
  }
}
