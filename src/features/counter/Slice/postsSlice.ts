/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Post } from '../../../types/Post';
import { getUserPosts } from '../../../api/posts';

type PostsState = {
  items: Post[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  isLoading: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk<Post[], number>(
  'posts/loadPosts',

  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, state => {
        state.hasError = false;
        state.isLoading = true;
      })
      .addCase(loadPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.hasError = false;
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(loadPosts.rejected, state => {
        state.isLoading = true;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
