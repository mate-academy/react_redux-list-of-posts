import { createSlice } from '@reduxjs/toolkit';

import { fetchPosts } from './post-operations';

import { Post } from '../../types/Post';

interface PostsState {
  items: Post[];
  loading: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loading: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        return {
          ...state,
          loading: true,
          hasError: false,
        };
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
          loading: false,
          hasError: false,
        };
      })
      .addCase(fetchPosts.rejected, (state) => {
        return {
          ...state,
          loading: false,
          hasError: true,
        };
      });
  },
});

export default postsSlice.reducer;
