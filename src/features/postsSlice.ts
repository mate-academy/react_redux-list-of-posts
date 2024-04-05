/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

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

export const loadPostsAsync = createAsyncThunk(
  'posts/fetchPosts',
  (userId: number) => getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPostsAsync.pending, state => {
      state.loaded = false;
    });

    builder.addCase(loadPostsAsync.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });

    builder.addCase(loadPostsAsync.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { clear } = postsSlice.actions;
export default postsSlice.reducer;
