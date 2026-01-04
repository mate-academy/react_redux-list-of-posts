/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string;
};

const initialState: PostsState = {
  posts: [],
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
  },
  extraReducers: builder => {
    builder
      .addCase(postsInit.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(postsInit.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(postsInit.rejected, state => {
        state.loading = false;
        state.error = 'Ошибка загрузки пользователей';
      });
  },
});
