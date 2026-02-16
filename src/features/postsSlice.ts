/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const loadUserPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const value = await getUserPosts(userId);

    return value;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadUserPosts.pending, state => {
        state.loaded = false;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(loadUserPosts.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { clear } = postsSlice.actions;
export default postsSlice.reducer;
