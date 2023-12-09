import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type Posts = {
  posts: Post[] | null;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: Posts = {
  posts: null,
  isLoading: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
        hasError: false,
      };
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    });
  },
});

export default postsSlice.reducer;
