/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const setUserPosts = createAsyncThunk(
  'posts/fetch',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(setUserPosts.pending, state => ({
      ...state,
      loaded: false,
    }));
    builder.addCase(setUserPosts.fulfilled, (state, action) => ({
      ...state,
      posts: action.payload,
      loaded: true,
    }));
    builder.addCase(setUserPosts.rejected, state => ({
      ...state,
      loaded: true,
      hasError: true,
    }));
  },
});

export const postsActions = postsSlice.actions;
