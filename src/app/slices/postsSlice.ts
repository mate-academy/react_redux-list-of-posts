import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { fetchPosts } from '../thunks/postsThunk';

export type PostState = {
  posts: Post[] | null,
  isLoading: boolean,
  hasError: boolean,
};

const initialState: PostState = {
  posts: null,
  isLoading: false,
  hasError: false,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          posts: action.payload,
        };
      })
      .addCase(fetchPosts.rejected, (state) => {
        return {
          ...state,
          isLoading: false,
          hasError: true,
        };
      });
  },
});

export default postSlice.reducer;
