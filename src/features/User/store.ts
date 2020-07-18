import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api, loadable } from 'utils';
import { Loadable } from 'types';
import { User, Geolocation } from './types';

const initialState: {
  session: User;
  geolocation: Geolocation;
  friends: Loadable<User[]>;
} = {
  session: {
    id: '',
    username: '',
    avatar: '',
    gender: 'other',
    age: 0,
    fullName: ''
  },
  geolocation: {
    country: '',
    state: '',
    city: '',
    zip: '',
    latitude: 0,
    longitude: 0
  },
  friends: loadable
};

export const getSession = createAsyncThunk('user/sessionFetched', async () => {
  const [error, response] = await api.get('/session.json');
  if (error) return false;
  return response.session;
});

export const getFriends = createAsyncThunk('user/friendsFetched', async () => {
  const [error, response] = await api.get('/friends.json');
  if (error) return false;
  return response.friends;
});

export const getGeoLocation = createAsyncThunk('user/geoLocationFetched', async () => {
  const [error, response] = await api.get('https://geolocation-db.com/json/', true);

  if (error) return false;

  const { country_name, state, city, postal, latitude, longitude } = response;

  return {
    country: country_name,
    state,
    city,
    zip: postal,
    latitude,
    longitude
  };
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLatLon(state, action: PayloadAction<{ latitude: number; longitude: number }>) {
      const { geolocation } = state;
      const { latitude, longitude } = action.payload;
      geolocation.latitude = latitude;
      geolocation.longitude = longitude;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSession.fulfilled, (state, { payload }) => {
      if (payload) state.session = payload;
    });
    builder.addCase(getGeoLocation.fulfilled, (state, { payload }) => {
      if (payload) state.geolocation = payload;
    });
    builder.addCase(getFriends.pending, ({ friends }) => {
      friends.loading = true;
    });
    builder.addCase(getFriends.fulfilled, ({ friends }, { payload }) => {
      friends.loading = false;
      if (payload) friends.data = payload;
      else friends.error = true;
    });
    builder.addCase(getFriends.rejected, ({ friends }) => {
      friends.loading = false;
      friends.error = true;
    });
  }
});

export const { setLatLon } = userSlice.actions;

export default userSlice.reducer;
