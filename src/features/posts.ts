/* eslint-disable-next-line no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export const init = createAsyncThunk(
  'posts/fetchPost',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = 'Error!';
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
