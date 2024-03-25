import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type Posts = {
  posts: Post[];
  loading: boolean;
  hasError: boolean;
};

const initialState: Posts = {
  posts: [],
  loading: false,
  hasError: false,
};

export const getPostsFromServer = createAsyncThunk(
  'posts/get',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPostsFromServer.pending, state => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getPostsFromServer.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        posts: action.payload,
        hasError: false,
      };
    });
    builder.addCase(getPostsFromServer.rejected, state => {
      return {
        ...state,
        loading: false,
        hasError: true,
      };
    });
  },
});

export default postsSlice.reducer;
