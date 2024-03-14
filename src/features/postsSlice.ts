/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loading: boolean;
  errorMessage: string;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  errorMessage: '',
};

export const getPosts = createAsyncThunk('posts/get', (userId: number) => {
  return getUserPosts(userId);
});

const postsSloce = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPosts.pending, state => {
      state.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, state => {
      state.loading = false;
      state.errorMessage = 'The posts have not been loaded';
    });
  },
});

export default postsSloce.reducer;
export const actions = postsSloce;
