/* eslint-disable */
import {
  PayloadAction,
  createAsyncThunk, createSlice
} from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type Posts = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialPosts: Posts = {
  items: [],
  loaded: true,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPosts,
  reducers: {
    setPosts: (value, action: PayloadAction<Post[]>) => {
      value.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userPosts.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(userPosts.fulfilled, (state: Posts, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(userPosts.rejected, (state: Posts) => {
      state.hasError = true;
      state.loaded = true;
    });
  }
});

export default postsSlice.reducer;
export const { setPosts } = postsSlice.actions;
export const userPosts = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
})