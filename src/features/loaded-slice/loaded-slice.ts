/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Loaded {
  loaded: boolean;
}

const initialState: Loaded = {
  loaded: false,
};

const loadedSlice = createSlice({
  name: 'loaded',
  initialState,
  reducers: {
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
  },
});

export const { setLoaded } = loadedSlice.actions;

export default loadedSlice.reducer;
