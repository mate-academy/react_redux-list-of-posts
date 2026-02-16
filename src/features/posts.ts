/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadUserPosts = createAsyncThunk(
  'posts/fetch',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(loadUserPosts.pending, state => {
      state.loaded = false;
    });
    builder.addCase(loadUserPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });
  },
});

export default postsSlice.reducer;
