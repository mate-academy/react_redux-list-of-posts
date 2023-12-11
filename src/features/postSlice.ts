/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts', (userId: number) => {
    return getUserPosts(userId);
  },
);

type PostsState = {
  posts: Post[],
  loading: boolean,
  error: boolean,
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPost: (state) => {
      state.posts = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { clearPost } = postsSlice.actions;
export default postsSlice.reducer;
