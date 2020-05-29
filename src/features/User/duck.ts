import { api } from 'utils';

// Action types
const SET_USER = 'SET_USER';
const SET_USERS = 'SET_USERS';

// Action creators
export const getUser = () => async (dispatch) => {
  const [error, response] = await api.get('/session');
  if (!error)
    dispatch({
      type: SET_USER,
      user: response
    });
};

export const getUsers = () => async (dispatch) => {
  const [error, response] = await api.get('/users');
  if (!error)
    dispatch({
      type: SET_USERS,
      users: response
    });
};

// Reducer
const initialState = {
  session: {},
  friends: []
};

export default function reducer(prevState = initialState, { type, user, users }) {
  switch (type) {
    case SET_USER:
      return { ...prevState, session: user };
    case SET_USERS:
      return { ...prevState, friends: users };
    default:
      return prevState;
  }
}
