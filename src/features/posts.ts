import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const fetchPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [] as Post[],
    loaded: false,
    hasError: false,
  },
  reducers: {
    clearPosts: state => {
      return { ...state, items: [], loaded: false, hasError: false };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        return { ...state, loaded: false, hasError: false };
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return { ...state, loaded: true, items: action.payload };
      })
      .addCase(fetchPosts.rejected, state => {
        return { ...state, loaded: true, hasError: true };
      });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
