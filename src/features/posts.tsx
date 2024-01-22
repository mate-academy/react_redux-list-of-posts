/* eslint-disable @typescript-eslint/comma-dangle */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
  selectedPost: Post | null;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
  selectedPost: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',

  async (userId: number) => {
    const value = await getUserPosts(userId);

    return value;
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post | null>) => {
      return { ...state, selectedPost: action.payload };
    },
    clearPosts: (state) => {
      return { ...state, items: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        return {
          ...state,
          loaded: false,
          hasError: false,
        };
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
          loaded: true,
          hasError: false,
        };
      })
      .addCase(fetchPosts.rejected, (state) => {
        return {
          ...state,
          hasError: true,
          loaded: true,
        };
      });
  },
});

export const { selectPost, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
