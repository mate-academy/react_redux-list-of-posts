import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export type PostsState = {
  items: Post[];
  hasError: boolean;
  loaded: boolean;
};

const initialState: PostsState = {
  items: [],
  hasError: false,
  loaded: false,
};

export const loadUserPosts = createAsyncThunk(
  'posts/loadUserPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearItems: state => {
      return {
        ...state,
        items: [],
      };
    },
  },

  extraReducers: builder => {
    builder.addCase(loadUserPosts.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });

    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
        loaded: true,
        hasError: false,
      };
    });

    builder.addCase(loadUserPosts.rejected, state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });
  },
});
