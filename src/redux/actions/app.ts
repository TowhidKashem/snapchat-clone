import { SHOW_DRAWER, HIDE_DRAWER } from 'redux/actions/actionTypes';

export const showDrawer = (component) => (dispatch) =>
  dispatch({
    type: SHOW_DRAWER,
    component
  });

export const hideDrawer = () => (dispatch) => dispatch({ type: HIDE_DRAWER });
