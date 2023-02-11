/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type DefaultState = {
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: DefaultState = {
  posts: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loaded = payload;
    },
    setHasError: (state, { payload }) => {
      state.loaded = payload;
    },
    setPosts: (state, { payload }) => {
      state.loaded = payload;
    },
  },
});

export const { actions } = postsSlice;
export default postsSlice.reducer;
