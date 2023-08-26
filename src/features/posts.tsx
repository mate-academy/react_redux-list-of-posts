/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
      state.loaded = false;
      state.hasError = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;

export const { clearPosts } = postsSlice.actions;
