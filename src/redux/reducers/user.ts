import { GET_WEATHER, GET_USER, GET_USERS } from 'redux/actions/actionTypes';

const initialState = {
  weather: {},
  currentUser: {},
  dummyUsers: []
};

const setWeather = (prevState, action) => ({
  ...prevState,
  weather: action.weather
});

const setUser = (prevState, action) => ({
  ...prevState,
  currentUser: action.user
});

const setUsers = (prevState, action) => ({
  ...prevState,
  dummyUsers: action.users
});

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case GET_WEATHER:
      return setWeather(prevState, action);
    case GET_USER:
      return setUser(prevState, action);
    case GET_USERS:
      return setUsers(prevState, action);
    default:
      return prevState;
  }
};

export default reducer;
