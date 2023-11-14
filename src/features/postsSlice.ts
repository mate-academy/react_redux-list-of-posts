/* eslint no-param-reassign: "error" */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

export type PostsState = {
  items: Post[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.items = action.payload;
    },

    clearPosts: (state) => {
      state.items = [];
    },

    setLoadedFalse: (state) => {
      state.loaded = false;
    },

    setLoadedTrue: (state) => {
      state.loaded = true;
    },

    setHasError: (state) => {
      state.hasError = true;
    },

    resetError: (state) => {
      state.hasError = false;
    },
  },
});

export const {
  setPosts,
  clearPosts,
  setLoadedFalse,
  setLoadedTrue,
  setHasError,
  resetError,
} = postsSlice.actions;

export default postsSlice.reducer;
