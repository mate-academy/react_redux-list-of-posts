/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsType = {
  posts: Post[];
  loaded: boolean;
  hasError: string;
};

const initialState: PostsType = {
  posts: [],
  loaded: false,
  hasError: '',
};

export const setPosts = createAsyncThunk('posts/set', (userId: number) => {
  return getUserPosts(userId);
});

export const { reducer, actions } = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => {
      state.posts = [];
      state.hasError = '';
      state.loaded = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(setPosts.pending, state => {
      state.loaded = true;
    });

    builder.addCase(setPosts.rejected, state => {
      state.loaded = false;
      state.hasError = 'Something went wrong';
    });

    builder.addCase(setPosts.fulfilled, (state, action) => {
      state.loaded = false;
      state.posts = action.payload;
    });
  },
});
