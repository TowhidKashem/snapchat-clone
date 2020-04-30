import { LOAD_MENU } from 'redux/actions/actionTypes';

export const loadMenu = (component) => {
  return (dispatch) => {
    dispatch({
      type: LOAD_MENU,
      component
    });
  };
};
