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

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  (id: number) => getUserPosts(id),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsEmpty: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

export const { setPostsEmpty } = postsSlice.actions;
export default postsSlice.reducer;
