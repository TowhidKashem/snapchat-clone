import { api } from 'utils/system';

// Action types
const SESSION_FETCHED = 'user/sessionFetched';
const FRIENDS_FETCHED = 'user/friendsFetched';
const GEO_LOCATION_FETCHED = 'user/geoLocationFetched';
const SET_LAT_LON = 'user/setLatLon';

// Action creators
export const getSession = () => async (dispatch) => {
  const [error, response] = await api.get('/session.json');

  if (!error)
    dispatch({
      type: SESSION_FETCHED,
      user: response
    });
};

export const getFriends = () => async (dispatch) => {
  const [error, response] = await api.get('/friends.json');

  if (!error)
    dispatch({
      type: FRIENDS_FETCHED,
      users: response.users
    });
};

export const getGeoLocation = () => async (dispatch) => {
  const [error, response] = await api.get('https://geolocation-db.com/json/', true);

  if (error) return [true];

  const { country_name, state, city, postal, latitude, longitude } = response;

  dispatch({
    type: GEO_LOCATION_FETCHED,
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
    case SESSION_FETCHED:
      return { ...prevState, session: user };
    case FRIENDS_FETCHED:
      return { ...prevState, friends: users };
    case GEO_LOCATION_FETCHED:
    case SET_LAT_LON:
      return { ...prevState, geolocation };
    default:
      return prevState;
  }
}
