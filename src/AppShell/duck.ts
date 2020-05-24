import { User } from 'types';
import { Drawer } from './Drawer/types';
import { api } from 'utils';

// Action types
const SHOW_DRAWER = 'SHOW_DRAWER';
const HIDE_DRAWER = 'HIDE_DRAWER';
const GET_USER = 'GET_USER';
const GET_USERS = 'GET_USERS';

// Action creators
export const showDrawer = (drawer: Drawer) => (dispatch) => {
  const defaults = {
    animationIn: 'slideInUp',
    animationOut: 'slideOutDown',
    animationInDuration: 300,
    animationOutDuration: 300,
    theme: 'light'
  };
  dispatch({
    type: SHOW_DRAWER,
    drawer: { ...defaults, ...drawer }
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
    //   animationIn: 'zoomIn',
    //   animationOut: 'zoomOut',
    //   animationInDuration: 300,
    //   animationOutDuration: 300,
    //   theme: 'dark',
    //   component: 'video',
    //   show: true
    // }
  ],
  currentUser: {},
  dummyUsers: []
};

const setShowDrawer = (prevState, drawer) => {
  const withoutCurrentDrawer = prevState.drawers.filter(
    ({ component }) => component !== drawer.component
  );
  const drawers = [...withoutCurrentDrawer, { ...drawer, show: true }];
  return { ...prevState, drawers };
};

const setHideDrawer = (prevState, component) => {
  const drawers = prevState.drawers.map((drawer) =>
    drawer.component === component ? { ...drawer, show: false } : drawer
  );
  return { ...prevState, drawers };
};

export default function reducer(
  prevState = initialState,
  { type, drawer, component, user, users }
) {
  switch (type) {
    case SHOW_DRAWER:
      return setShowDrawer(prevState, drawer);
    case HIDE_DRAWER:
      return setHideDrawer(prevState, component);
    case GET_USER:
      return { ...prevState, currentUser: user };
    case GET_USERS:
      return { ...prevState, dummyUsers: users };
    default:
      return prevState;
  }
}
