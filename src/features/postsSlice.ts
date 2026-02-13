/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostState = {
  posts: Post[] | [];
  loaded: boolean;
  hasError: string;
};

const initialState: PostState = {
  posts: [],
  loaded: false,
  hasError: '',
};

export const setPosts = createAsyncThunk('state/posts', async (id: number) => {
  const result = await getUserPosts(id);

  return result;
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    clearPosts: state => {
      state.posts = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(setPosts.fulfilled, (state, action) => {
      state.loaded = true;
      state.posts = action.payload;
    });
    builder.addCase(setPosts.pending, state => {
      state.hasError = '';
      state.loaded = false;
      state.posts = [];
    });
    builder.addCase(setPosts.rejected, state => {
      state.hasError = 'Something went wrong';
      state.loaded = true;
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
