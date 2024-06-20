/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: true,
  hasError: false,
};

export const fetchPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    remove: state => {
      state.items = [];
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loaded = false;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(fetchPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
export const { remove } = postsSlice.actions;
