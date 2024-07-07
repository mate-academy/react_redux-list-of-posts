import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialPosts: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const getPosts = createAsyncThunk('posts/fetch', (authorId: number) => {
  return getUserPosts(authorId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPosts,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPosts.pending, state => {
      return {
        ...state,
        posts: [],
        loaded: false,
      };
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload,
        loaded: true,
      };
    });
    builder.addCase(getPosts.rejected, state => {
      return {
        ...state,
        hasError: true,
        loaded: true,
      };
    });
  },
});

export default postsSlice.reducer;
