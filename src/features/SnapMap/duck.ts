import { Weather } from './types';
import { api } from 'utils';

// Action types
export const SET_SNAPS = 'SET_SNAPS';
export const SET_WEATHER = 'SET_WEATHER';

// Action creators
export const getSnaps = (lat, lon) => async (dispatch) => {
  const [error, response] = await api.get(`/snaps/${lat}/${lon}`);

  if (!error) {
    // Set some dummy coordinates to make snaps seem close to user
    const coords = [
      {
        lat: lat + 0.007,
        lon: lon - 0.007
      },
      {
        lat: lat + 0.009,
        lon: lon + 0.005
      },
      {
        lat: lat + 0.006,
        lon: lon - 0.001
      },
      {
        lat: lat - 0.005,
        lon: lon - 0.002
      }
    ];

    const snaps = response.snaps.map((snap, index) => ({
      ...snap,
      lat: coords[index].lat,
      lon: coords[index].lon
    }));

    dispatch({ type: SET_SNAPS, snaps });
  }
};

export const getWeather = (lat, lon) => async (dispatch) => {
  let [error, response] = await api.get(
    `https://www.metaweather.com/api/location/search/?lattlong=${lat},${lon}`,
    true
  );
  if (!error) {
    const whereOnEarthID = response[0]?.woeid;
    [error, response] = await api.get(
      `https://www.metaweather.com/api/location/${whereOnEarthID}/`,
      true
    );
    if (!error) {
      const { temperature, condition } = response;
      dispatch({
        type: SET_WEATHER,
        weather: {
          temperature,
          condition
        }
      });
    }
  }
  // const { temperature, condition } = response;
  // if (!error)
  //   dispatch({
  //     type: SET_WEATHER,
  //     weather: {
  //       temperature,
  //       condition
  //     }
  //   });
};

// Reducer
const initialState = {
  snaps: [],
  weather: {}
};

export default function reducer(prevState = initialState, { type, snaps, weather }) {
  switch (type) {
    case SET_SNAPS:
      return { ...prevState, snaps };
    case SET_WEATHER:
      return { ...prevState, weather };
    default:
      return prevState;
  }
}
