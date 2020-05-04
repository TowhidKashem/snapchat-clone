import { SHOW_DRAWER, HIDE_DRAWER } from 'redux/actions/actionTypes';

export const showDrawer = (
  component,
  animationIn = 'slideInUp',
  animationOut = 'slideOutDown'
) => (dispatch) =>
  dispatch({
    type: SHOW_DRAWER,
    component,
    animationIn,
    animationOut
  });

export const hideDrawer = (component) => (dispatch) =>
  dispatch({ type: HIDE_DRAWER, component });
