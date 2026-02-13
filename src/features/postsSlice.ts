/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

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

export const loadUserPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.posts = [];
    },
  },

  extraReducers: builder => {
    builder.addCase(loadUserPosts.pending, state => {
      state.loaded = false;
    });

    builder.addCase(
      loadUserPosts.fulfilled,
      (state, { payload }: PayloadAction<Post[]>) => {
        state.posts = payload;
        state.loaded = true;
      },
    );

    builder.addCase(loadUserPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
