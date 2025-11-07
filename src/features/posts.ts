/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  loaded: boolean;
  posts: Post[];
  hasError: boolean;
};

const initialState: PostsState = {
  loaded: false,
  posts: [],
  hasError: false,
};

export const loadPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
      state.hasError = false;
    });

    builder.addCase(loadPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
