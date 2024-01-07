/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type InitialState = {
  posts: Post[],
  loaded: boolean,
  hasError: string,
};

const initialState: InitialState = {
  posts: [],
  loaded: false,
  hasError: '',
};

export const fetchPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPosts.rejected, state => {
        state.hasError = 'Something went wrong';
        state.loaded = true;
      });
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
