/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
};

export const initPosts = createAsyncThunk(
  'posts/fetch',
  (id: number) => getUserPosts(id),
);

export const authorSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
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
        state.error = 'Error';
      });
  },
});

export default authorSlice.reducer;
