// src/features/postsSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as postApi from '../api/posts';
import { Post } from '../types/Post';
import type { RootState } from '../app/store';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPostsByUser = createAsyncThunk<Post[], number>(
  'posts/loadPostsByUser',
  async (userId: number) => {
    const posts = await postApi.getUserPosts(userId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPostsByUser.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
        // eslint-disable-next-line no-param-reassign
        state.items = [];
      })
      .addCase(loadPostsByUser.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
      })
      .addCase(loadPostsByUser.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
        // eslint-disable-next-line no-param-reassign
        state.items = [];
      });
  },
});

export const postsReducer = postsSlice.reducer;

// selectors
export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsLoaded = (state: RootState) => state.posts.loaded;
export const selectPostsError = (state: RootState) => state.posts.hasError;
