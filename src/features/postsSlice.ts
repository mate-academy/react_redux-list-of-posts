import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
/* eslint-disable no-param-reassign */

type InitialState = {
  posts: Post[];
  loader: boolean;
  hasError: string;
};

const initialState: InitialState = {
  posts: [],
  loader: true,
  hasError: '',
};

export const getPosts = createAsyncThunk('fetch/posts', (userId: number) =>
  getUserPosts(userId),
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPosts.pending, state => {
      state.hasError = '';
      state.loader = true;
    });

    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loader = false;
    });

    builder.addCase(getPosts.rejected, state => {
      state.loader = false;
      state.hasError = 'Fetch Post Error';
    });
  },
});

export default postsSlice.reducer;
