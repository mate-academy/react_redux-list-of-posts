/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  data: Post[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
  data: [],
  status: 'idle',
};

export const getPostsAsync = createAsyncThunk(
  '/posts',
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
      .addCase(getPostsAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(getPostsAsync.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
