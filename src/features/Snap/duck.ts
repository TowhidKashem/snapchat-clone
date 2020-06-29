import { Snap } from './types';

// Action types
export const ADD_SNAP = 'snap/addSnap';
export const REMOVE_SNAP = 'snap/removeSnap';

// Action creators
export const addSnap = (snap: Snap) => (dispatch) => dispatch({ type: ADD_SNAP, snap });

export const removeSnap = () => (dispatch) => dispatch({ type: REMOVE_SNAP });

// Reducer
const initialState = {};

export default function reducer(prevState = initialState, { type, snap }) {
  switch (type) {
    case ADD_SNAP:
      return snap;
    case REMOVE_SNAP:
      return {};
    default:
      return prevState;
  }
}
