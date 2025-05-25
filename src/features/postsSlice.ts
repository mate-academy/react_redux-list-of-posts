import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Post } from '../types/Post';

import { getUserPosts } from '../api/posts';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadUserPosts = createAsyncThunk(
  'posts/fetch',
  (authorId: number) => {
    return getUserPosts(authorId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => ({ ...state, items: [] }),
  },
  extraReducers(builder) {
    builder.addCase(loadUserPosts.pending, state => {
      return { ...state, loaded: false, hasError: false };
    });
    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      return { ...state, loaded: true, items: action.payload };
    });
    builder.addCase(loadUserPosts.rejected, state => {
      return { ...state, hasError: true, loaded: true };
    });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
