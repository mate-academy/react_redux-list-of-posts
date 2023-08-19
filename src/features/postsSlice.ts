/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';
import { Status } from '../types/Status';

export interface PostsState {
  posts: Post[];
  status: Status;
}

const initialState: PostsState = {
  posts: [],
  status: Status.Idle,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = Status.Idle;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = Status.Failed;
      });
  },
});
