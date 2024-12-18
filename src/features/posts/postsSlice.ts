/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const importPostsAsync = createAsyncThunk(
  'posts/fetch',
  async (selectedAuthorId: number) => {
    const authorPosts = await getUserPosts(selectedAuthorId);

    return authorPosts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(importPostsAsync.pending, state => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(importPostsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(importPostsAsync.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default postsSlice.reducer;
