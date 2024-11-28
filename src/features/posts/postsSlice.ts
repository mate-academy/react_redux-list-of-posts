/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { fetchPosts } from './asyncActions';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPosts: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(fetchPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { resetPosts } = postsSlice.actions;
export default postsSlice.reducer;
