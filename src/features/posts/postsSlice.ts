/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type InitialState = {
  posts: Post[] | [];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const userPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPost: state => {
      state.posts = [];
    },
  },

  extraReducers(builder) {
    builder.addCase(userPosts.pending, state => {
      state.loaded = false;
    });
    builder.addCase(userPosts.fulfilled, (state, action) => {
      state.loaded = true;
      state.posts = action.payload;
    });
    builder.addCase(userPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const { clearPost } = postsSlice.actions;
