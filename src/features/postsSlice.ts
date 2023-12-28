/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostState {
  posts: Post[],
  loading: boolean,
  error: boolean,
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: false,
};

export const initPosts = createAsyncThunk(
  'posts/fetchPosts',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: (state) => {
      state.posts = [];
      state.loading = false;
      state.error = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(initPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(initPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(initPosts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
export const { clear } = postsSlice.actions;
export default postsSlice.reducer;
