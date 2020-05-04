import { SET_VIDEO } from 'redux/actions/actionTypes';

const initialState = {
  video: null
};

const setVideo = (prevState, video) => ({ ...prevState, ...video });

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case SET_VIDEO:
      return setVideo(prevState, action);
    default:
      return prevState;
  }
};

export default reducer;
