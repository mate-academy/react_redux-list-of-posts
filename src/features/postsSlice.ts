/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { User } from '../types/User';

type PostsState = {
  posts: Post[];
  loading: boolean,
  error: boolean;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: false,
};

export const init = createAsyncThunk('posts/fetch', (author: User | null) => {
  return author
    ? getUserPosts(author.id)
    : [];
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.loading = true;
      state.posts = action.payload;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = true;
      state.error = true;
    });
  },
});

export default postsSlice.reducer;
