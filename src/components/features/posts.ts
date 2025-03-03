/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const initPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPosts: state => {
      state.posts = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(initPosts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          `Error users: ${action.error?.message}` || 'Something went wrong';
      });
  },
});

export const { resetPosts } = postsSlice.actions;
