/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface PostsState {
  posts: Post[] | [],
  loaded: boolean,
  hasError: boolean,
}

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const getPostsAsync = createAsyncThunk(
  'posts/getPosts',
  async (userId: number) => {
    const value = await getUserPosts(userId);

    return value;
  },
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
    builder
      .addCase(getPostsAsync.pending, (state) => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loaded = true;
      })
      .addCase(getPostsAsync.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
