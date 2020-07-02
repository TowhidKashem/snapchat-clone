import { Drawer, FooterType } from 'AppShell/types';

// Action types
const SHOW_DRAWER = 'app/showDrawer';
const HIDE_DRAWER = 'app/hideDrawer';
const SET_FOOTER_TYPE = 'app/setFooterType';

// Action creators
export const showDrawer = (drawer: Drawer) => (dispatch) => {
  const defaults = {
    show: true,
    animationIn: 'slideInUp',
    animationOut: 'slideOutDown',
    animationInDuration: 300,
    animationOutDuration: 300,
    theme: 'light',
    position: 'front'
  };
  dispatch({
    type: SHOW_DRAWER,
    drawer: { ...defaults, ...drawer }
  });
};

export const hideDrawer = (component: string) => (dispatch) =>
  dispatch({ type: HIDE_DRAWER, component });

export const setFooterType = (footerType: FooterType) => (dispatch) =>
  dispatch({ type: SET_FOOTER_TYPE, footerType });

// Reducer
const initialState = {
  footerType: 'full',
  drawers: [
    {
      animationIn: 'zoomIn',
      animationOut: 'zoomOut',
      animationInDuration: 300,
      animationOutDuration: 300,
      theme: 'stripped',
      component: 'snapMap',
      position: 'front',
      show: true
    }
  ]
};

const setShowDrawer = (prevState, drawer) => {
  const minusCurrentDrawer = prevState.drawers.filter(
    ({ component }) => component !== drawer.component
  );
  return {
    ...prevState,
    drawers: [...minusCurrentDrawer, drawer]
  };
};

const setHideDrawer = (prevState, component) => {
  let drawers;
  // Close select drawer
  if (component) {
    drawers = prevState.drawers.map((drawer) => {
      if (drawer.component === component) return { ...drawer, show: false };
      return drawer;
    });
  }
  // Close all drawers
  else {
    const drawersOpen = prevState.drawers.filter(({ show }) => show);
    const lastDrawerOpen = drawersOpen[drawersOpen.length - 1].component;
    // Close all drawers but show exit animation only on the last opened one
    if (drawersOpen.length > 1) {
      drawers = prevState.drawers.map((drawer) => {
        if (drawer.component === lastDrawerOpen) {
          return { ...drawer, show: false };
        }
        return {
          ...drawer,
          show: false,
          animationOutDuration: 0
        };
      });
    } else {
      drawers = prevState.drawers.map((drawer) => ({
        ...drawer,
        show: false
      }));
    }
  }
  return { ...prevState, drawers };
};

export default function reducer(
  prevState = initialState,
  { type, drawer, component, footerType }
) {
  switch (type) {
    case SHOW_DRAWER:
      return setShowDrawer(prevState, drawer);
    case HIDE_DRAWER:
      return setHideDrawer(prevState, component);
    case SET_FOOTER_TYPE:
      return { ...prevState, footerType };
    default:
      return prevState;
  }
}
