/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type PostsState = {
  posts: Post[] | [];
  post: Post | null
  loaded: boolean;
  error: string;
};

const initialState: PostsState = {
  posts: [],
  post: null,
  loaded: true,
  error: '',
};

export const initPosts = createAsyncThunk(
  'user/fetch',
  async (userId: number) => {
    const value = await getUserPosts(userId);

    return value;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePosts: (state) => {
      state.posts = [];
      state.post = null;
    },
    addPost: (state, action) => {
      state.post = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initPosts.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(initPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });

    builder.addCase(initPosts.rejected, (state) => {
      state.loaded = true;
      state.error = 'Error';
    });
  },
});

export const { removePosts, addPost } = postsSlice.actions;
export default postsSlice.reducer;
