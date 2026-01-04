/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  items: Post[];
  loading: boolean;
  error: string;
};

const initialState: PostsState = {
  items: [],
  loading: false,
  error: '',
};

export const postsInit = createAsyncThunk('posts/init', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts(state) {
      state.items = [];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(postsInit.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(postsInit.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(postsInit.rejected, state => {
        state.loading = false;
        state.error = 'Error fetching posts';
      });
  },
});
