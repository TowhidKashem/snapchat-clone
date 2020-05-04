import { SHOW_DRAWER, HIDE_DRAWER } from 'redux/actions/actionTypes';

export const showDrawer = (drawer) => (dispatch) => {
  const {
    component,
    animationIn = 'slideInUp',
    animationOut = 'slideOutDown',
    theme = 'light'
  } = drawer;
  dispatch({
    type: SHOW_DRAWER,
    component,
    animationIn,
    animationOut,
    theme
  });
};

export const hideDrawer = (component) => (dispatch) =>
  dispatch({ type: HIDE_DRAWER, component });
