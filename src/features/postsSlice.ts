/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';

type PostsState = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    startLoading(state) {
      state.loaded = false;
      state.hasError = false;
    },

    setPosts(state, action: PayloadAction<Post[]>) {
      state.items = action.payload;
      state.loaded = true;
    },

    setError(state) {
      state.hasError = true;
      state.loaded = true;
    },

    clearPosts(state) {
      state.items = [];
      state.loaded = true;
      state.hasError = false;
    },
  },
});

export const { startLoading, setPosts, setError, clearPosts } =
  postsSlice.actions;

export default postsSlice.reducer;
