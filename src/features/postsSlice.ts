/* eslint-disable no-param-reassign */
import {
  ActionReducerMapBuilder, createAsyncThunk, createSlice,
} from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { PostsState } from '../types/PostState';

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const getPosts = createAsyncThunk(
  'posts/get',
  (userId: number) => getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: (state) => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<PostsState>) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loaded = false;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(getPosts.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { clear } = postsSlice.actions;
export default postsSlice.reducer;
