import { Snap } from './types';

// Action types
export const SET_SNAP = 'SET_SNAP';

// Action creators
export const openSnap = (snap: Snap) => async (dispatch) =>
  dispatch({ type: SET_SNAP, snap });

// Reducer
const initialState = {};

export default function reducer(prevState = initialState, { type, snap }) {
  switch (type) {
    case SET_SNAP:
      return snap;
    default:
      return prevState;
  }
}
