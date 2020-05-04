import { SHOW_DRAWER, HIDE_DRAWER } from 'redux/actions/actionTypes';

export const showDrawer = (
  component,
  animationIn = 'slideInUp',
  animationOut = 'slideOutDown',
  theme = 'light'
) => (dispatch) =>
  dispatch({
    type: SHOW_DRAWER,
    component,
    animationIn,
    animationOut,
    theme
  });

export const hideDrawer = (component) => (dispatch) =>
  dispatch({ type: HIDE_DRAWER, component });
