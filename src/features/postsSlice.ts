/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type DefaultState = {
  posts: Post[],
  isLoading: boolean,
  hasError: boolean,
};

const initialState: DefaultState = {
  posts: [],
  isLoading: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setHasError: (state, { payload }) => {
      state.hasError = payload;
    },
    setPosts: (state, { payload }) => {
      state.posts = payload;
    },
    resetPosts: (state) => {
      state.posts = [];
    },
  },
});

export const {
  setLoading,
  setHasError,
  setPosts,
  resetPosts,
} = postsSlice.actions;
export default postsSlice.reducer;
