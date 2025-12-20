/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    },

    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },

    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

export const { setPosts, setLoaded, setError } = postsSlice.actions;
export default postsSlice.reducer;
