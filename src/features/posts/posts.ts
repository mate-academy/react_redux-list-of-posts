/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';
import { User } from '../../types/User';

const initialState = {
  loaded: false,
  posts: [] as Post[],
  error: false,
};

export const loadPosts = createAsyncThunk('posts/fetch', async (user: User) => {
  return getUserPosts(user.id);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts(state) {
      state.posts = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      state.error = false;
      state.loaded = false;
    });
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });
    builder.addCase(loadPosts.rejected, state => {
      state.error = true;
      state.loaded = true;
    });
  },
});
