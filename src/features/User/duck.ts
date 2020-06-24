import { api } from 'utils/api';

// Action types
const SET_USER = 'SET_USER';
const SET_USERS = 'SET_USERS';
const SET_GEO = 'SET_GEO';
const SET_LAT_LON = 'SET_LAT_LON';

// Action creators
export const getUser = () => async (dispatch) => {
  const [error, response] = await api.get('/session.json');

  if (!error)
    dispatch({
      type: SET_USER,
      user: response
    });
};

export const getUsers = () => async (dispatch) => {
  const [error, response] = await api.get('/users.json');

  if (!error)
    dispatch({
      type: SET_USERS,
      users: response.users
    });
};

export const getGeoLocation = () => async (dispatch) => {
  const [error, response] = await api.get('https://geolocation-db.com/json/', true);

  if (error) return [true];

  const { country_name, state, city, postal, latitude, longitude } = response;

  dispatch({
    type: SET_GEO,
    geolocation: {
      country: country_name,
      state,
      city,
      zip: postal,
      latitude,
      longitude
    }
  });

  return [false, { latitude, longitude }];
};

export const setLatLon = (latitude, longitude) => (dispatch) =>
  dispatch({
    type: SET_LAT_LON,
    geolocation: {
      latitude,
      longitude
    }
  });

// Reducer
const initialState = {
  session: {},
  friends: [],
  geolocation: {}
};

export default function reducer(
  prevState = initialState,
  { type, user, users, geolocation }
) {
  switch (type) {
    case SET_USER:
      return { ...prevState, session: user };
    case SET_USERS:
      return { ...prevState, friends: users };
    case SET_GEO:
    case SET_LAT_LON:
      return { ...prevState, geolocation };
    default:
      return prevState;
  }
}
