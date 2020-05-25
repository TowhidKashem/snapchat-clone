import { Weather } from 'types';
import { api } from 'utils';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

// Action types
export const GET_WEATHER = 'GET_WEATHER';

// Action creators
export const getWeather = (lat, lon) => async (dispatch) => {
  // const [error, response] = await api('http://api.weatherapi.com/v1/current.json', {
  //   key: WEATHER_API_KEY,
  //   q: lat + ',' + lon
  // });
  // if (!error) {
  //   dispatch({
  //     type: GET_WEATHER,
  //     weather: _parseWeather(response)
  //   });
  // }
};

// Utils
const _parseWeather = ({ current, location }): Weather => ({
  city: location.name,
  temperature: current.temp_f.toFixed(0),
  icon: current.condition.icon
});

// Reducer
export default function reducer(prevState = {}, { type, weather }) {
  switch (type) {
    case GET_WEATHER:
      return { ...prevState, weather };
    default:
      return prevState;
  }
}
