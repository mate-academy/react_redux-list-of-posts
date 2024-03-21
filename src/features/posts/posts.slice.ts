/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { loadUserPosts } from './actions';
import { Post } from '../../types/Post';

export interface PostsState {
  posts: Post[];
  isLoaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  posts: [],
  isLoaded: false,
  hasError: false,
};

const { actions, reducer } = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(loadUserPosts.pending, state => {
      state.isLoaded = false;
    });
    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      state.isLoaded = true;
      state.posts = action.payload;
    });
    builder.addCase(loadUserPosts.rejected, state => {
      state.hasError = true;
      state.isLoaded = true;
    });
  },
});

export { actions, reducer };
