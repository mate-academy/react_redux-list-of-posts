/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { Error } from '../types/Error';
import { getPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: Error;
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: Error.None,
};

export const initPosts = createAsyncThunk('posts/fetch', (id: number) => {
  return getPosts(id);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initPosts.pending, (state) => {
      state.loaded = true;
    });

    builder.addCase(initPosts.fulfilled, (state, action) => {
      state.loaded = false;
      state.posts = action.payload;
    });

    builder.addCase(initPosts.rejected, (state) => {
      state.loaded = false;
      state.hasError = Error.GetPosts;
    });
  },
});

export default postsSlice.reducer;
