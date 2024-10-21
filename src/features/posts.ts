/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const initPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setUserPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(initPosts.pending, state => {
      state.loaded = false;
    });
    builder.addCase(initPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });
    builder.addCase(initPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { setUserPosts } = postsSlice.actions;
export default postsSlice.reducer;
