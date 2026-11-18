import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
/* eslint-disable no-param-reassign */

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    loaded: false,
    hasError: false,
    items: [] as Post[],
  },
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
  },
});

export const { setPosts, setError, setLoaded } = postsSlice.actions;
export default postsSlice.reducer;
