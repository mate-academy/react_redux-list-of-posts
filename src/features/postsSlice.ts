/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';
import { Maybe } from '../types/Maybe';

type PostsState = {
  posts: Post[];
  postsIsLoading: boolean;
  postsError: Maybe<string>;
};

const initialState: PostsState = {
  posts: [],
  postsIsLoading: false,
  postsError: null,
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
      state.postsError = null;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.postsIsLoading = false;
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.postsIsLoading = false;
      state.postsError = action.error.name || null;
    });
  },
});

export const { clearPosts } = postsStateSlice.actions;
export default postsStateSlice.reducer;
