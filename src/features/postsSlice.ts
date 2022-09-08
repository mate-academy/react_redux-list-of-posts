/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type PostsState = {
  posts: Post[];
  postsIsLoading: boolean;
  postsIsError: boolean;
};

const initialState: PostsState = {
  posts: [],
  postsIsLoading: false,
  postsIsError: false,
};

export const fetchPosts = createAsyncThunk<Post[], number>(
  'posts/fetch_posts',
  getUserPosts,
);

export const postsStateSlice = createSlice({
  name: 'postsState',
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.postsIsLoading = true;
      state.postsIsError = false;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.postsIsLoading = false;
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.postsIsError = true;
      state.postsIsLoading = false;
    });
  },
});

export const postsStateReducer = postsStateSlice.reducer;
export const { clearPosts } = postsStateSlice.actions;
