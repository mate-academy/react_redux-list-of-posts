/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const fetchPosts = createAsyncThunk(
  'posts/fetch_Posts', (id: number) => {
    return getUserPosts(id);
  },
);

type State = {
  posts: Post[],
  error: string | null,
  loading: boolean,
  post: Post | null,
};

const initialState: State = {
  posts: [],
  error: null,
  loading: false,
  post: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      state.post = action.payload;
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
        state.error = 'Error';
      });
  },
});

export default postsSlice.reducer;
export const { setPosts, setPost } = postsSlice.actions;
