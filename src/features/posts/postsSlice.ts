import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
import { Post } from '../../types/Post';

const initialState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.items = action.payload;
    },

    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },

    setHasError: (state, action) => {
      state.hasError = action.payload;
    },
  },
});

export default postsSlice.reducer;
export const { setPosts, setLoaded, setHasError } = postsSlice.actions;
