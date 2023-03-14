/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface PostsState {
  loaded: boolean,
  hasError: boolean,
  posts: Post[],
}

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  posts: [],
};

export const setPosts = createAsyncThunk(
  'posts/getPosts',
  async (userId: number) => {
    const value = await getUserPosts(userId);

    return value;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePosts: (state: PostsState) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setPosts.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(setPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.hasError = false;
      state.loaded = true;
    });

    builder.addCase(setPosts.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { removePosts } = postsSlice.actions;

export default postsSlice.reducer;
