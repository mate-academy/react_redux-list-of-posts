/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { loadUserPosts } from '../thunks/postsThunk';

interface PostsState {
  posts: Post[],
  selectedPost: null | Post,
  loaded: boolean,
  hasError: boolean,
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserPosts.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      state.loaded = true;
      state.posts = action.payload;
    });
    builder.addCase(loadUserPosts.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
      state.posts = [];
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const postsActions = postsSlice.actions;
