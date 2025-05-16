/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type InitialState = {
  posts: Post[];
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  posts: [],
  loading: false,
  error: '',
};

export const loadPosts = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts(state) {
      state.posts = [];
      state.error = '';
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });

    builder.addCase(loadPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unexpected error occured';
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
