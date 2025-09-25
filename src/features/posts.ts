import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { RootState } from '../app/store';

interface PostsState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const loadUserPosts = createAsyncThunk(
  'posts/fetch',

  async (userId: number) => {
    return getUserPosts(userId);
  },
);

/* eslint-disable no-param-reassign */
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUserPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(loadUserPosts.rejected, state => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
export const {} = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsLoaded = (state: RootState) => state.posts.loaded;
export const selectPostsHasError = (state: RootState) => state.posts.hasError;
