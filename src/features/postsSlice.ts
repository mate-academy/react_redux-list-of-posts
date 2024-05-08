/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { Status } from '../types/Status';

type PostsState = {
  posts: Post[];
  status: Status;
};

const initialState: PostsState = {
  posts: [],
  status: Status.idle,
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
        state.status = Status.loading;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = Status.idle;
      })
      .addCase(fetchPosts.rejected, state => {
        state.status = Status.failed;
      });
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
