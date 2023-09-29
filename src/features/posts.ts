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

export const init = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
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
    builder.addCase(init.pending, (state) => {
      return { ...state, loaded: false };
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, loaded: true, items: action.payload };
    });
    builder.addCase(init.rejected, (state) => {
      return { ...state, hasError: true };
    });
  },
});

export const { actions } = postsSlice;
