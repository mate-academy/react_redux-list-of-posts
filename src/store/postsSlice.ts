/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Post } from '../types/Post';
import { PostsState } from '../types/PostsState';

const initialState: PostsState = {
  items: [],
  loading: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const res = await fetch(`/posts?userId=${userId}`);
    const data = (await res.json()) as Post[];

    await new Promise(resolve => setTimeout(resolve, 200));

    return data;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts(state) {
      state.items = [];
      state.loading = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.items;

export default postsSlice.reducer;
