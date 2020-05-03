import {
  SHOW_DRAWER,
  HIDE_DRAWER,
  SHOW_MODAL,
  HIDE_MODAL
} from 'redux/actions/actionTypes';

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

export const showModal = (component) => (dispatch) =>
  dispatch({ type: SHOW_MODAL, component });

export const hideModal = () => (dispatch) => dispatch({ type: HIDE_MODAL });
