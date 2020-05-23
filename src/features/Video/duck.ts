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

const setVideo = (prevState, action) => ({
  ...prevState,
  video: action.video
});

export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case SET_VIDEO:
      return setVideo(prevState, action);
    default:
      return prevState;
  }
}
