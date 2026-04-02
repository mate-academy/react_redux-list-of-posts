/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
type PostsState = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const postsLoaded = createAsyncThunk(
  'posts/postsLoaded',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postsLoaded.pending, state => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(postsLoaded.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(postsLoaded.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default postSlice.reducer;
