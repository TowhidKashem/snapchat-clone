// Action types
export const SET_VIDEO = 'SET_VIDEO';

// Action creators
export const showVideo = (video) => async (dispatch) => {
  dispatch({ type: SET_VIDEO, video });
};

// Reducer
const initialState = {
  video: null
};

export default function reducer(prevState = initialState, { type, video }) {
  switch (type) {
    case SET_VIDEO:
      return { ...prevState, video };
    default:
      return prevState;
  }
}
