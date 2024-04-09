/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

export const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: () => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => {
        state.loaded = false;
      })
      .addCase(fetchUserPosts.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loaded = true;

        state.posts = action.payload;
      });
  },
});

export const { clear } = postsSlice.actions;

export default postsSlice.reducer;
