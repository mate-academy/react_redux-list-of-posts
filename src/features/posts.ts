/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types';
import { getUserPosts } from '../api/posts';

type InitialState = {
  loaded: boolean,
  hasError: boolean,
  posts: Post[];
};

const initialState: InitialState = {
  loaded: true,
  hasError: false,
  posts: [],
};

export const fetchPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPost: (state) => {
      state.posts = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state) => {
      return { ...state, loaded: false, hasError: false };
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      return { ...state, loaded: true, items: action.payload };
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      return { ...state, hasError: true, loaded: true };
    });
  },
});

export const { actions } = postsSlice;
