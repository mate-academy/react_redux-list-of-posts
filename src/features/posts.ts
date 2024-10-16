import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { getUserPosts } from '../api/posts';

type PostsState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const getPosts = createAsyncThunk<Post[], User['id']>(
  'posts/fetch',
  userId => getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        return {
          ...state,
          posts: action.payload,
        };
      })
      .addCase(getPosts.pending, state => {
        return { ...state, loaded: false };
      })
      .addCase(getPosts.rejected, state => {
        return { ...state, hasError: true };
      })
      .addMatcher(getPosts.settled, state => {
        return { ...state, loaded: true };
      });
  },
});
