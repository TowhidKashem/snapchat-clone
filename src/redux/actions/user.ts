import { GET_WEATHER, GET_USER, GET_USERS } from 'redux/actions/actionTypes';
import { Weather, User } from 'types';
import { WEATHER_API_KEY } from 'config';
import { api } from 'utils';

export const getWeather = (lat, lon) => async (dispatch) => {
  const [error, response] = await api('http://api.weatherapi.com/v1/current.json', {
    key: WEATHER_API_KEY,
    q: lat + ',' + lon
  });

  if (!error) {
    dispatch({
      type: GET_WEATHER,
      weather: _parseWeather(response)
    });
  }
};

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

const _parseWeather = ({ current, location }): Weather => ({
  city: location.name,
  temperature: current.temp_f.toFixed(0),
  icon: current.condition.icon
});

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
