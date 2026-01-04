/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { clear } from 'console';

type PostsState = {
  items: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string;
};

const initialState: PostsState = {
  items: [],
  selectedPost: null,
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
    setSelectedPost(state, action) {
      state.selectedPost = action.payload;
    },
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
        state.error = 'Ошибка загрузки пользователей';
      });
  },
});
