/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export type PostsState = {
  posts: Post[];
  status: Status;
};

const initialState: PostsState = {
  posts: [],
  status: Status.IDLE,
};

export const postsFetch = createAsyncThunk(
  'posts/fetch',
  (id: number) => getUserPosts(id),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsSetEmpty: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postsFetch.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(postsFetch.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.posts = action.payload;
      })
      .addCase(postsFetch.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

export const { postsSetEmpty } = postsSlice.actions;
export default postsSlice.reducer;
