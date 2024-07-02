/* eslint-disable no-param-reassign */

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const loadUserPosts = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

export type PostsState = {
  posts: Post[] | [];
  loaded: boolean;
  error: boolean;
};

const initialState: PostsState = {
  posts: [],
  loaded: true,
  error: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadUserPosts.pending, state => {
        state.loaded = false;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.posts = action.payload;
      })
      .addCase(loadUserPosts.rejected, state => {
        state.error = true;
        state.loaded = true;
      });
  },
});

export const { actions } = postsSlice;
export default postsSlice.reducer;
