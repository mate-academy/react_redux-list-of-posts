/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export interface PostsState {
  items: Post[];
  loading: boolean;
  hasError: string;
}

export const fetchPosts = createAsyncThunk(
  'users/fetchPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

const initialState: PostsState = {
  items: [],
  loading: false,
  hasError: '',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loading = true;
      state.items = [];
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPosts.rejected, state => {
      state.hasError = 'Something went wrong';
      state.loading = false;
    });
  },
});

export default postsSlice.reducer;
