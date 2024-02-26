/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { loadUserPosts } from './actions';
import { Post } from '../../types/Post';

export interface PostsState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

const { actions, reducer } = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUserPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
      state.posts = [];
    });
    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      state.loaded = true;
      state.posts = action.payload;
    });
    builder.addCase(loadUserPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
      state.posts = [];
    });
  },
});

export { actions, reducer };
