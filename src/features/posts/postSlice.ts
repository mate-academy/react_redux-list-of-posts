/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export interface PostUseState {
  items: Post[];
  loaded: boolean;
  hasError: string;
}

const initialState: PostUseState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
        state.hasError = '';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loaded = true;
        state.hasError = 'Failed to load posts';
      });
  },
});

export default postsSlice.reducer;
