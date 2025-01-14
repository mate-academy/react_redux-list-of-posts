/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type UsersTypeSlice = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersTypeSlice = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPostsOfUser = createAsyncThunk(
  'posts/fetch',
  async (id: number) => {
    return getUserPosts(id);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPostsOfUser.pending, state => {
        state.loaded = false;
      })
      .addCase(loadPostsOfUser.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(loadPostsOfUser.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      });
  },
});

export default postsSlice.reducer;
