import { Weather } from './types';
import { api } from 'utils';

// const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

// Action types
export const GET_SNAPS = 'GET_SNAPS';
export const GET_WEATHER = 'GET_WEATHER';

// Action creators
export const getSnaps = (lat, lon) => async (dispatch) => {
  const [error, response] = await api.get('/snaps');

  if (!error) {
    const coords = [
      {
        lat: lat - 0.01,
        lon: lon - 0.002
      },
      {
        lat: lat + 0.007,
        lon: lon + 0.005
      }
      // {
      //   lat: lat + 0.003,
      //   lon: lon - 0.0
      // },
      // {
      //   lat: lat + 0.007,
      //   lon: lon - 0.007
      // }
    ];

    const snaps = response.snaps.map((snap, index) => ({
      lat: coords[index].lat,
      lon: coords[index].lon,
      ...snap
    }));

    dispatch({ type: GET_SNAPS, snaps });
  }
};

// export const getWeather = (lat, lon) => async (dispatch) => {
//   const [error, response] = await api('http://api.weatherapi.com/v1/current.json', {
//     key: WEATHER_API_KEY,
//     q: lat + ',' + lon
//   });
//   if (!error) {
//     dispatch({
//       type: GET_WEATHER,
//       weather: _parseWeather(response)
//     });
//   }
// };

// // Utils
// const _parseWeather = ({ current, location }): Weather => ({
//   city: location.name,
//   temperature: current.temp_f.toFixed(0),
//   icon: current.condition.icon
// });

// Reducer
const initialState = {
  snaps: [],
  weather: {}
};

export default function reducer(prevState = initialState, { type, snaps, weather }) {
  switch (type) {
    case GET_SNAPS:
      return { ...prevState, snaps };
    case GET_WEATHER:
      return { ...prevState, weather };
    default:
      return prevState;
  }
}
