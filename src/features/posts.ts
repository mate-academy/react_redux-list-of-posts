/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { RootState } from '../app/store';

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

export const getUserPostsAsync = createAsyncThunk<Post[], number>(
  'posts/fetch',
  async userId => {
    const userPosts = await getUserPosts(userId);

    return userPosts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      state.posts = [];
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserPostsAsync.pending, state => {
      state.loaded = false;
    });

    builder.addCase(getUserPostsAsync.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    });

    builder.addCase(getUserPostsAsync.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { clearPosts } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
