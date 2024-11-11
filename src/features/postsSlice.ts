import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

export const initPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initPosts.pending, state => {
      return { ...state, loaded: true };
    });

    builder.addCase(initPosts.fulfilled, (state, action) => {
      return { ...state, posts: action.payload, loaded: false };
    });

    builder.addCase(initPosts.rejected, state => {
      return { ...state, loaded: false, hasError: true };
    });
  },
});

export const postsReducer = postsSlice.reducer;
