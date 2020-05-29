import { Snap } from './types';

// Action types
export const SET_SNAPS = 'SET_SNAPS';

// Action creators
export const openSnaps = (snaps: Snap[]) => async (dispatch) =>
  dispatch({ type: SET_SNAPS, snaps });

// Reducer
const initialState = {
  snaps: []
};

export default function reducer(prevState = initialState, { type, snaps }) {
  switch (type) {
    case SET_SNAPS:
      return { ...prevState, snaps };
    default:
      return prevState;
  }
}
