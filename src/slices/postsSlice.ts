/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchByUser',
  async (userId: number) => getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPosts(state) {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchPostsByUser.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPostsByUser.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.loaded = true;
      })
      .addCase(fetchPostsByUser.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      }),
});

export const { resetPosts } = postsSlice.actions;
export default postsSlice.reducer;
