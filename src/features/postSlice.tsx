/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

type PostsType = {
  posts: Post[],
  loading: boolean,
  error: boolean,
};

const initialState: PostsType = {
  posts: [],
  loading: false,
  error: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPost: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { clearPost } = postsSlice.actions;
export default postsSlice.reducer;
