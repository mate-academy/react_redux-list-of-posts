/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post } from '../../types/Post';
import { loadPosts } from './postsAsyncActions';

export interface PostsInitialState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsInitialState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      state.loaded = true;
      state.hasError = false;
    });

    builder.addCase(
      loadPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.loaded = false;
        state.posts = action.payload;
      },
    );

    builder.addCase(loadPosts.rejected, state => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
