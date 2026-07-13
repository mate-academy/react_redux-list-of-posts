/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

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
    postsLoading: state => {
      state.loaded = false;
      state.hasError = false;
    },
    postsLoaded: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
    postsError: state => {
      state.loaded = true;
      state.hasError = true;
    },
    clearPosts: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
});

export const { postsLoading, postsLoaded, postsError, clearPosts } =
  postsSlice.actions;
export default postsSlice.reducer;
