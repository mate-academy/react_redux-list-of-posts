/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  items: Post[];
  loading: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loading: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      state.items = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, state => {
        state.hasError = false;
        state.loading = true;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadPosts.rejected, state => {
        state.hasError = true;
        state.loading = false;
      });
  },
});

export default postsSlice.reducer;
export const { setPosts } = postsSlice.actions;
