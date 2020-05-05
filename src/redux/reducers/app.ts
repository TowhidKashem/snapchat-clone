import { SHOW_DRAWER, HIDE_DRAWER } from 'redux/actions/actionTypes';

const initialState = {
  drawers: [
    // {
    //   component: 'map',
    //   show: true
    // }
  ]
};

const setShowDrawer = (prevState, { component, animationIn, animationOut, theme }) => {
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
      theme,
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

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case SHOW_DRAWER:
      return setShowDrawer(prevState, action);
    case HIDE_DRAWER:
      return setHideDrawer(prevState, action);
    default:
      return prevState;
  }
};

export default reducer;
