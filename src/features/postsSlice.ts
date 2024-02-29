/* eslint-disable no-param-reassign */
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const fetchPostsAsync
  = createAsyncThunk(
    'posts/fetch',
    (userId: number) => getUserPosts(userId),
  );

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state: PostsState, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostsAsync.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(
      fetchPostsAsync.fulfilled,
      (state: PostsState, action: PayloadAction<Post[]>) => {
        state.loaded = true;
        state.posts = action.payload;
      },
    );

    builder.addCase(fetchPostsAsync.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
