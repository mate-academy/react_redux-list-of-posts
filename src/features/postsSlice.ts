/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface PostsSliceState {
  posts: Post[];
  status: 'idle' | 'loading' | 'failed';
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsSliceState = {
  posts: [],
  status: 'idle',
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading';
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(fetchPosts.rejected, state => {
        state.status = 'failed';
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
