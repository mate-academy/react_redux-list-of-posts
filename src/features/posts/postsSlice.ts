/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { postsThunk } from './postsThunk';
import { Post } from '../../types/Post';

interface Posts {
  loaded: boolean,
  hasError: boolean,
  selectedPost: null | Post,
  posts: Post[],
}

const initialState: Posts = {
  loaded: false,
  hasError: false,
  selectedPost: null,
  posts: [],
};

const posts = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postsThunk.fulfilled, (state, action) => {
      state.loaded = true;
      state.posts = action.payload;
    });
    builder.addCase(postsThunk.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(postsThunk.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { selectPost } = posts.actions;
export const postsReducer = posts.reducer;
