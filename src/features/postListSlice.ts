/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { postsFetch } from '../thunks/postListThunk';

type PostState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
  selectedPost: Post | null;
};

const initialState: PostState = {
  posts: [],
  loaded: false,
  hasError: false,
  selectedPost: null,
};

const postListSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postsFetch.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(postsFetch.fulfilled, (state, action) => {
      state.loaded = true;
      state.posts = action.payload;
    });

    builder.addCase(postsFetch.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
      state.posts = [];
    });
  },
});

export const postReducer = postListSlice.reducer;
export const postsActions = postListSlice.actions;
