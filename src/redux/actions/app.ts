import { SHOW_DRAWER, HIDE_DRAWER } from 'redux/actions/actionTypes';
import { Drawer } from 'types';

export const showDrawer = (drawer: Drawer) => (dispatch) => {
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
