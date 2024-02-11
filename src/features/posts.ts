import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk('posts/load', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => {
      return {
        ...state,
        posts: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, () => {
        return {
          posts: [],
          loaded: false,
          hasError: false,
        };
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        return {
          ...state,
          posts: action.payload,
          loaded: true,
          hasError: false,
        };
      })
      .addCase(loadPosts.rejected, () => {
        return {
          posts: [],
          loaded: true,
          hasError: true,
        };
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
