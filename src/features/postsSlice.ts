/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  status: 'idle' | 'loading' | 'failed';
};

const initialState: PostsState = {
  posts: [],
  status: 'idle',
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
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
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchPosts.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
