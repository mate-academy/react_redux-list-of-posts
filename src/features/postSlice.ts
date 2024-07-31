/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type InitialState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  items: [],
  hasError: false,
  loaded: false,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },

    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },

    setHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

export const { set, setHasError, setLoaded } = postSlice.actions;
export default postSlice.reducer;
