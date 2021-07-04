import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'utils';
import { celsiusToFahrenheit } from './utils';
import { Weather } from './types';
import { Snap } from 'features/Snap/types';
import { abbrConditionMap } from './data';

const initialState: {
  snaps: Snap[];
  weather: Weather;
} = {
  snaps: [],
  weather: {
    temperature: 0,
    condition: ''
  }
};

export const getSnaps = createAsyncThunk(
  'snapMap/snapsFetched',
  async ({
    lat,
    lon,
    city,
    state
  }: {
    lat: number;
    lon: number;
    city: string;
    state: string;
  }) => {
    const [error, response] = await api.get(`/snaps.json?geo=${lat},${lon}`);

    if (error) return false;

    // Set some dummy coordinates to make snaps seem close to user
    const coords = [
      {
        lat: lat + 0.006,
        lon: lon - 0.006
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
        lat: lat,
        lon: lon + 0.004
      }
    ];

    const snaps = response.snaps.map((snap: Snap, index: number) => ({
      ...snap,
      location: city && state ? `${city}, ${state}` : null,
      lat: coords[index].lat,
      lon: coords[index].lon
    }));

    return snaps;
  }
);

export const getWeather = createAsyncThunk(
  'snapMap/weatherFetched',
  async ({ lat, lon }: { lat: number; lon: number }) => {
    // Hit the weather API through a free CORs proxy so we don't have to write one for this project..
    const baseURL = `https://api.allorigins.win/get?url=${encodeURIComponent(
      'https://www.metaweather.com/api/location'
    )}`;

    // If fetching the user's actual weather fails below for some reason
    // store this dummy data for purposes of the demo
    let weather = {
      temperature: 75,
      condition: 'clear'
    };

    let [error, response] = await api.get(
      `${baseURL}/search/?lattlong=${lat},${lon}`,
      true
    );

    if (error) return false;

    const whereOnEarthID = JSON.parse(response.contents)[0]?.woeid;
    [error, response] = await api.get(`${baseURL}/${whereOnEarthID}/`, true);

    if (error) return false;

    const { the_temp, weather_state_abbr } = JSON.parse(
      response?.contents
    ).consolidated_weather[0];

    weather = {
      temperature: celsiusToFahrenheit(the_temp),
      condition: abbrConditionMap[weather_state_abbr]
    };

    return weather;
  }
);

const snapMapSlice = createSlice({
  name: 'snapMap',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWeather.fulfilled, (state, { payload }) => {
      if (payload) state.weather = payload;
    });
    builder.addCase(getSnaps.fulfilled, (state, { payload }) => {
      if (payload) state.snaps = payload;
    });
  }
});

export default snapMapSlice.reducer;
