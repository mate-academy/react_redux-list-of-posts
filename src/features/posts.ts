import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';
/* eslint-disable no-param-reassign */

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

type PostsType = {
  items: Post[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: PostsType = {
  items: [],
  isLoading: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });

    builder.addCase(init.rejected, state => {
      state.isLoading = false;
      state.hasError = false;
    });
  },
});

export default postsSlice.reducer;
