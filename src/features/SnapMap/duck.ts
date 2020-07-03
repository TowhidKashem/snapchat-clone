import { api } from 'utils/system';
import { celsiusToFahrenheit } from './utils';
import { abbrConditionMap } from './data';

// Action types
export const SNAPS_FETCHED = 'snapMap/snapsFetched';
export const WEATHER_FETCHED = 'snapMap/weatherFetched';

// Action creators
export const getSnaps = (lat, lon, city, state) => async (dispatch) => {
  const [error, response] = await api.get(`/snaps.json?geo=${lat},${lon}`);

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
      },
      {
        lat: lat - 0.001,
        lon: lon - 0.005
      },
      {
        lat: lat + 0.005,
        lon: lon - -0.006
      },
      {
        lat: lat - 0.01,
        lon: lon + 0.002
      },
      {
        lat: lat - 0.01,
        lon: lon - 0.007
      },
      {
        lat: lat - 0.005,
        lon: lon + 0.005
      },
      {
        lat: lat,
        lon: lon + 0.004
      }
    ];

    const snaps = response.snaps.map((snap, index) => ({
      ...snap,
      location: `${city}, ${state}`,
      lat: coords[index].lat,
      lon: coords[index].lon
    }));

    dispatch({ type: SNAPS_FETCHED, snaps });
  }
};

export const getWeather = (lat, lon) => async (dispatch) => {
  const baseURL =
    'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location';

  // If fetching the user's actual weather fails below for some reason
  // store this dummy data for purposes of the demo
  let weather = {
    temperature: 75,
    condition: 'c'
  };

  let [error, response] = await api.get(
    `${baseURL}/search/?lattlong=${lat},${lon}`,
    true
  );

  if (!error) {
    const whereOnEarthID = response[0]?.woeid;
    [error, response] = await api.get(`${baseURL}/${whereOnEarthID}/`, true);

    if (!error) {
      const { the_temp, weather_state_abbr } = response?.consolidated_weather[0];

      weather = {
        temperature: celsiusToFahrenheit(the_temp),
        condition: abbrConditionMap[weather_state_abbr]
      };
    }
  }

  dispatch({ type: WEATHER_FETCHED, weather });
};

// Reducer
const initialState = {
  snaps: [],
  weather: {}
};

export default function reducer(prevState = initialState, { type, snaps, weather }) {
  switch (type) {
    case SNAPS_FETCHED:
      return { ...prevState, snaps };
    case WEATHER_FETCHED:
      return { ...prevState, weather };
    default:
      return prevState;
  }
}
