import { Snap } from './types';

// Action types
export const SET_SNAP = 'SET_SNAP';

// Action creators
export const addSnap = (snap: Snap) => (dispatch) => dispatch({ type: SET_SNAP, snap });

export const removeSnap = () => (dispatch) => dispatch({ type: SET_SNAP, snap: {} });

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
