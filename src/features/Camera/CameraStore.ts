import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'utils';
import { Loadable, loadable } from 'utils/loadable';
import { Photo, CameraMode } from './data';

const initialState: {
  cameraMode: CameraMode;
  photoTaken: boolean;
  photos: Loadable<Photo[]>;
} = {
  cameraMode: 'user',
  photoTaken: false,
  photos: loadable
};

export const getPhotos = createAsyncThunk('photos/getPhotos', async () => {
  const [error, response] = await api.get('/photos.json');
  if (!error) return response.photos;
});

const cameraSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setPhoto: {
      reducer(
        state,
        action: PayloadAction<{
          month: string;
          year: number;
          dataURL: string;
        }>
      ) {
        const { month, year, dataURL } = action.payload;
        if (state.photoTaken) {
          state.photos.data[0].images.unshift(action.payload.dataURL);
        } else {
          state.photoTaken = true;
          state.photos.data.unshift({
            month,
            year,
            images: [dataURL]
          });
        }
      },
      prepare(dataURL: string) {
        const time = new Date();
        return {
          payload: {
            dataURL,
            month: time.toLocaleString('default', { month: 'long' }),
            year: time.getFullYear()
          }
        };
      }
    },
    toggleCameraMode(state) {
      state.cameraMode = state.cameraMode === 'user' ? 'environment' : 'user';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPhotos.pending, ({ photos }) => {
      photos.loading = true;
    });
    builder.addCase(getPhotos.fulfilled, ({ photos }, { payload }) => {
      photos.loading = false;
      if (payload) {
        photos.data = payload;
      } else {
        photos.error = true;
      }
    });
    builder.addCase(getPhotos.rejected, ({ photos }) => {
      photos.loading = false;
      photos.error = true;
    });
  }
});

export const { setPhoto, toggleCameraMode } = cameraSlice.actions;

export default cameraSlice.reducer;
