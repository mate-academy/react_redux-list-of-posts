/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type State = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};
const initialState: State = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const getPostsThunk = createAsyncThunk(
  'posts/get',
  async (id: Post['id']) => getUserPosts(id),
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPostsThunk.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(getPostsThunk.fulfilled, (state, { payload }) => {
        state.posts = payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(getPostsThunk.rejected, state => {
        state.posts = [];
        state.loaded = true;
        state.hasError = true;
      });
  },
});
