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

export const postsFromServerAsync = createAsyncThunk(
  'posts/fetchPosts',
  (authorId: number) => {
    return getUserPosts(authorId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postsFromServerAsync.pending, (state) => {
        state.loaded = true;
      })
      .addCase(postsFromServerAsync.fulfilled, (state, action) => {
        state.loaded = false;
        state.items = action.payload;
      })
      .addCase(postsFromServerAsync.rejected, (state) => {
        state.loaded = false;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
