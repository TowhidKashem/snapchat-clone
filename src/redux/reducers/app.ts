import {
  SHOW_DRAWER,
  HIDE_DRAWER,
  SHOW_MODAL,
  HIDE_MODAL
} from 'redux/actions/actionTypes';

const initialState = {
  drawers: [],
  showModal: false,
  modalComponent: ''
  // showModal: true,
  // modalComponent: 'map'
};

const setShowDrawer = (prevState, { component, animationIn, animationOut }) => {
  let found = false;
  const drawers = prevState.drawers.map((drawer) => {
    if (drawer.component === component) {
      found = true;
      return { ...drawer, show: true };
    }
    return drawer;
  });
  if (!found)
    drawers.push({
      component,
      animationIn,
      animationOut,
      show: true
    });
  return { ...prevState, drawers };
};

const setHideDrawer = (prevState, action) => {
  const drawers = prevState.drawers.map((drawer) => {
    if (drawer.component === action.component) {
      return { ...drawer, show: false };
    }
    return drawer;
  });
  return { ...prevState, drawers };
};

const setShowModal = (prevState, action) => ({
  ...prevState,
  showModal: true,
  modalComponent: action.component
});

const setHideModal = (prevState) => ({
  ...prevState,
  showModal: false
});

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case SHOW_DRAWER:
      return setShowDrawer(prevState, action);
    case HIDE_DRAWER:
      return setHideDrawer(prevState, action);
    case SHOW_MODAL:
      return setShowModal(prevState, action);
    case HIDE_MODAL:
      return setHideModal(prevState);
    default:
      return prevState;
  }
};

export default reducer;
