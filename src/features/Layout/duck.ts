import { Drawer, User } from 'types';
import { api } from 'utils';

// Action types
const SHOW_DRAWER = 'SHOW_DRAWER';
const HIDE_DRAWER = 'HIDE_DRAWER';

const GET_USER = 'GET_USER';
const GET_USERS = 'GET_USERS';

// Action creators
export const showDrawer = (drawer: Drawer) => (dispatch) => {
  const {
    component,
    animationIn = 'slideInUp',
    animationOut = 'slideOutDown',
    animationInDuration = 300,
    animationOutDuration = 300,
    theme = 'light'
  } = drawer;
  dispatch({
    type: SHOW_DRAWER,
    component,
    animationIn,
    animationOut,
    animationInDuration,
    animationOutDuration,
    theme
  });
};

export const hideDrawer = (component) => (dispatch) =>
  dispatch({ type: HIDE_DRAWER, component });

export const getUser = () => async (dispatch) => {
  const [error, response] = await api('https://randomuser.me/api');

  if (!error) {
    dispatch({
      type: GET_USER,
      user: _parseUsers(response.results)[0]
    });
  }
};

export const getUsers = () => async (dispatch) => {
  const [error, response] = await api('https://randomuser.me/api', {
    results: 100
  });

  if (!error) {
    dispatch({
      type: GET_USERS,
      users: _parseUsers(response.results)
    });
  }
};

// Utils
const _parseUsers = (users): User[] =>
  users.map(
    ({ gender, dob, login, picture, name }): User => ({
      id: login.uuid,
      username: login.username,
      avatar: picture.thumbnail,
      gender,
      age: dob.age,
      fullName: name.first + ' ' + name.last
    })
  );

// Reducer
const initialState = {
  drawers: [
    // {
    //   component: 'map',
    //   show: true
    // }
  ],
  currentUser: {},
  dummyUsers: []
};

const setShowDrawer = (
  prevState,
  {
    component,
    animationIn,
    animationOut,
    animationInDuration,
    animationOutDuration,
    theme
  }
) => {
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
      animationInDuration,
      animationOutDuration,
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

const setUser = (prevState, action) => ({
  ...prevState,
  currentUser: action.user
});

const setUsers = (prevState, action) => ({
  ...prevState,
  dummyUsers: action.users
});

export default function reducer(prevState = initialState, action) {
  switch (action.type) {
    case SHOW_DRAWER:
      return setShowDrawer(prevState, action);
    case HIDE_DRAWER:
      return setHideDrawer(prevState, action);
    case GET_USER:
      return setUser(prevState, action);
    case GET_USERS:
      return setUsers(prevState, action);
    default:
      return prevState;
  }
}
