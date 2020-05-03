import { SHOW_DRAWER, HIDE_DRAWER } from 'redux/actions/actionTypes';

const initialState = {
  showDrawer: true,
  drawerComponent: 'account'
};

const setShowDrawer = (prevState, action) => ({
  ...prevState,
  showDrawer: true,
  drawerComponent: action.component
});

const setHideDrawer = (prevState) => ({
  ...prevState,
  showDrawer: false
});

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case SHOW_DRAWER:
      return setShowDrawer(prevState, action);
    case HIDE_DRAWER:
      return setHideDrawer(prevState);
    default:
      return prevState;
  }
};

export default reducer;
