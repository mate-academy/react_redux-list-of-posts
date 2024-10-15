/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as postsApi from '../../api/posts';
import { Post } from '../../types/Post';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const posts = await postsApi.getUserPosts(userId);

    return posts;
  },
);

const postsSlice = createSlice({
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
        return {
          ...state,
          loaded: true,
        };
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
          loaded: false,
        };
      })
      .addCase(fetchPosts.rejected, state => {
        return {
          ...state,
          hasError: true,
          loaded: true,
        };
      });
  },
});

export const postsReducer = postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
