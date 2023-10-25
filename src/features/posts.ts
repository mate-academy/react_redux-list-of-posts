/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const fetchUserPosts = createAsyncThunk('posts/fetch',
  async (userId: number) => {
    if (userId) {
      const posts = await getUserPosts(userId);

      return posts;
    }

    return [];
  });

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserPosts.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(fetchUserPosts.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default postsSlice.reducer;
export const { setPosts } = postsSlice.actions;
