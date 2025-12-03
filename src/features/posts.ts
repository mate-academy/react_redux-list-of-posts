/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { User } from '../types/User';

type State = {
  user: User | null;
  posts: Post[];
  loading: boolean;
  hasError: boolean;
};

const initialState: State = {
  user: null,
  posts: [],
  loading: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      state.loading = true;
      state.hasError = false;
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });

    builder.addCase(loadPosts.rejected, state => {
      state.hasError = true;
      state.loading = false;
    });
  },
});

export const { setCurrentUser } = postsSlice.actions;

export default postsSlice.reducer;
