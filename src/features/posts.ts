import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const fetchUserPosts = createAsyncThunk(
  'posts/fetch',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

type PostsState = {
  posts: Post[] | null;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: null,
  isLoading: false,
  hasError: false,
};

const PostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          posts: action.payload,
        };
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        return {
          ...state,
          isLoading: false,
          hasError: true,
        };
      });
  },
});

export default PostSlice.reducer;
