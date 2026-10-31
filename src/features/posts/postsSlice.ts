import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import type { Post } from '../../types/Post';

export const fetchPosts = createAsyncThunk('posts/fetch', getUserPosts);

export interface PostsState {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
}

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        return {
          ...state,
          loaded: false,
          hasError: false,
          items: [],
        };
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return {
          ...state,
          loaded: true,
          hasError: false,
          items: action.payload,
        };
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        if (action.meta.aborted) {
          return state;
        }

        return {
          ...state,
          loaded: true,
          hasError: true,
        };
      });
  },
});

export const { clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
