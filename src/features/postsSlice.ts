/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserPosts } from '../api/posts';

import { Post } from '../types/Post';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: true,
  hasError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state: PostsState) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (
        state: PostsState,
        action: PayloadAction<Post[]>,
      ) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state: PostsState) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
