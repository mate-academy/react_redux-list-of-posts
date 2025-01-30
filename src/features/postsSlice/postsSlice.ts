/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const loadUserPosts = createAsyncThunk('posts/fetch', getUserPosts);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadUserPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadUserPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
        state.loaded = true;
      })
      .addCase(loadUserPosts.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { clearPosts } = postSlice.actions;
export default postSlice.reducer;
