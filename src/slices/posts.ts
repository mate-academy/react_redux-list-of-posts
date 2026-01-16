/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

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

export const fetchPosts = createAsyncThunk<Post[], number>(
  'posts/fetch',
  async (userId: number) => {
    return getUserPosts(userId);
  },
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
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.loaded = true;
      })

      .addCase(fetchPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      }),
});

export const { resetPosts } = postsSlice.actions;

export default postsSlice.reducer;
