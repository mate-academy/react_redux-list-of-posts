/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[] | null;
  loading: boolean;
  error: string;
}

const initialState: PostsState = {
  posts: null,
  loading: false,
  error: '',
};

export const initPosts = createAsyncThunk(
  'posts/fetchPosts',
  (userId: number) => getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    removePosts: (state) => {
      state.posts = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initPosts.pending, (state) => {
        state.loading = true;
      })

      .addCase(initPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })

      .addCase(initPosts.rejected, (state) => {
        state.error = 'Something went wrong';
        state.loading = false;
      });
  },
});

export const {
  setPosts,
  removePosts,
} = postsSlice.actions;

export default postsSlice.reducer;
