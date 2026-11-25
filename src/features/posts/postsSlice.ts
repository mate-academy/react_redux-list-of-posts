/* eslint-disable no-param-reassign */

import { Post } from '../../types/Post';
import { createSlice } from '@reduxjs/toolkit';
import { initPosts } from './postsThunk';

interface PostsState {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
}

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.items = [];
      })
      .addCase(initPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(initPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
