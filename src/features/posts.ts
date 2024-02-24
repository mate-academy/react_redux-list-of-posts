/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type State = {
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: State = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const initPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initPosts.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(initPosts.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });
    builder.addCase(initPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });
  },
});

export default postSlice.reducer;
export const { clear } = postSlice.actions;
