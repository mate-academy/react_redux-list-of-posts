import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';

export const loadPosts = createAsyncThunk(
  'posts/load',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
  currentRequestId: string | null;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
  currentRequestId: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,

  reducers: {
    clearPosts: state => ({
      ...state,
      items: [],
      loaded: false,
      hasError: false,
      currentRequestId: null,
    }),
  },

  extraReducers: builder => {
    builder
      .addCase(loadPosts.pending, (state, action) => ({
        ...state,
        items: [],
        loaded: false,
        hasError: false,
        currentRequestId: action.meta.requestId,
      }))

      .addCase(loadPosts.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return state;
        }

        return {
          ...state,
          items: action.payload,
          loaded: true,
          hasError: false,
          currentRequestId: null,
        };
      })

      .addCase(loadPosts.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return state;
        }

        return {
          ...state,
          loaded: true,
          hasError: true,
          currentRequestId: null,
        };
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
