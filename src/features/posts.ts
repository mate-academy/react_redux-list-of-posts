/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[],
  loading: boolean,
  error: string,
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    cleanPosts: (state) => {
      state.posts = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(init.rejected, (state) => {
        state.loading = false;
        state.error = 'Error!';
      });
  },
});

export const { cleanPosts } = postsSlice.actions;
export default postsSlice.reducer;
