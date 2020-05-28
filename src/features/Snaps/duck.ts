import { Media } from './types';

// Action types
export const SET_MEDIA = 'SET_MEDIA';

// Action creators
export const showMedia = (media: Media[]) => async (dispatch) =>
  dispatch({ type: SET_MEDIA, media });

// Reducer
const initialState = {
  location: null,
  time: null,
  type: null,
  file: null
};

export default function reducer(prevState = initialState, { type, media }) {
  switch (type) {
    case SET_MEDIA:
      return { ...prevState, ...media };
    default:
      return prevState;
  }
}
