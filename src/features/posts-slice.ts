/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getPosts, getUserPosts } from '../api/posts';

type Posts = {
  loaded: boolean;
  hasError: boolean;
  items: Post[] | null;
};

const initialState: Posts = {
  loaded: false,
  hasError: false,
  items: null,
};

export const initPosts = createAsyncThunk('posts/fetch', () => {
  return getPosts();
});

export const initUserPosts = createAsyncThunk(
  'userPosts/fetch',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

const postSlicer = createSlice({
  name: 'post',
  initialState,
  reducers: {
    postLoaded: (state, action) => {
      state.loaded = action.payload;
    },
    hasError: (state, action) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(initUserPosts.pending, state => {
      state.loaded = false;
    });
    builder.addCase(initUserPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(initUserPosts.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });
  },
});

export const { postLoaded, hasError } = postSlicer.actions;

export default postSlicer.reducer;
