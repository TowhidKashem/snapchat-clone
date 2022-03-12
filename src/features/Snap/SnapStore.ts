import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Snap = {
  type: 'video' | 'photo' | '';
  url: string;
  location?: string;
  lat?: number;
  lon?: number;
  time?: number;
  caption?: string;
  shareable?: boolean;
};

const defaultSnap: Snap = {
  type: '',
  url: '',
  location: '',
  lat: 0,
  lon: 0,
  time: 0,
  caption: '',
  shareable: false
};

const initialState: Snap = defaultSnap;

const snapSlice = createSlice({
  name: 'snap',
  initialState,
  reducers: {
    addSnap(state, { payload }: PayloadAction<Snap>) {
      return payload;
    },
    removeSnap(state) {
      return defaultSnap;
    }
  }
});

export const { addSnap, removeSnap } = snapSlice.actions;

export default snapSlice.reducer;
