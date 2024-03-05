/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type Posts = {
  posts: Post[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: Posts = {
  posts: [],
  isLoading: false,
  hasError: false,
};

export const getPosts = createAsyncThunk('posts/get', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPosts.pending, state => {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
        hasError: false,
      };
    });
    builder.addCase(getPosts.rejected, state => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    });
  },
});

export default postsSlice.reducer;
