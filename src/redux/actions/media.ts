import { SET_VIDEO } from 'redux/actions/actionTypes';

export const showVideo = (video) => async (dispatch) => {
  dispatch({ type: SET_VIDEO, video });
};
