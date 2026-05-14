/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const startPostsState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState: startPostsState,
  reducers: {
    startLoading: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
    loadingFailed: state => {
      state.items = [];
      state.loaded = true;
      state.hasError = true;
    },
    postsLoaded: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
  },
});

export const { startLoading, loadingFailed, postsLoaded } = postsSlice.actions;
export default postsSlice.reducer;
