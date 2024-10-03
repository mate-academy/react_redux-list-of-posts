/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostState {
  items: Post[];
  loaded: boolean;
  hasError: string;
}

const initialState: PostState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const fetchPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loaded = true;
        state.hasError = 'Error';
      });
  },
});

export default postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
