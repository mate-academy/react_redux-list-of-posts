/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[];
  statusPosts: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
  posts: [],
  statusPosts: 'loading',
};

export const loadPosts = createAsyncThunk(
  'posts/fetch', (postId: number) => getUserPosts(postId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPosts.pending, (state) => {
      state.statusPosts = 'loading';
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.statusPosts = 'idle';
      state.posts = action.payload;
    });

    builder.addCase(loadPosts.rejected, (state) => {
      state.statusPosts = 'failed';
    });
  },
});

export const { clear } = postsSlice.actions;

export default postsSlice.reducer;
