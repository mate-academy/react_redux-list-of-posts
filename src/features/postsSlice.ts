import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { User } from '../types/User';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk<Post[], User['id']>(
  'posts/fetch',
  userId => getUserPosts(userId),
);

export const { reducer, actions } = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPosts.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
        };
      })
      .addCase(loadPosts.pending, state => {
        return { ...state, loaded: false };
      })
      .addCase(loadPosts.rejected, state => {
        return { ...state, hasError: true };
      })
      .addMatcher(loadPosts.settled, state => {
        return { ...state, loaded: true };
      });
  },
});

export const postsSelector = (state: RootState) => state.posts;
