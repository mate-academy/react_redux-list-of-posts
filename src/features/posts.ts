/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    loaded: false,
    hasError: false,
    posts: [] as Post[],
  },
  reducers: {
    setPosts: (state, action: PayloadAction<Post[] | []>) => {
      state.posts = action.payload;
    },

    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

const {
  actions: { setPosts, setError, setLoaded },
} = postsSlice;

export { setPosts, setError, setLoaded };
