import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  loaded: boolean;
  hasError: boolean;
  posts: Post[];
}

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  posts: [],
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
          loaded: false,
          hasError: false,
          posts: [],
        };
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        return {
          ...state,
          loaded: true,
          hasError: false,
          posts: action.payload,
        };
      })
      .addCase(loadPosts.rejected, () => {
        return {
          loaded: true,
          hasError: true,
          posts: [],
        };
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
