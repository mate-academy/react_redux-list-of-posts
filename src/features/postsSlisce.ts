/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsSliceState = {
  posts: Post[];
  status: 'idle' | 'loading' | 'failed';
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsSliceState = {
  posts: [],
  status: 'idle',
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk('posts/fetch',
  async (userId: number) => {
    if (userId) {
      const posts = await getUserPosts(userId);

      return posts;
    }

    return [];
  });

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, state => {
      state.status = 'loading';
      state.loaded = false;
      state.hasError = false;
    })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(fetchPosts.rejected, state => {
        state.hasError = true;
        state.loaded = true;
        state.status = 'failed';
      });
  },
});
