/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: string;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const init = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, { payload }: PayloadAction<[]>) {
      state.items = payload;
    },
    reset: state => {
      state.hasError = '';
      state.loaded = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      state.loaded = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;

      state.loaded = false;
    });
    builder.addCase(init.rejected, state => {
      state.loaded = false;

      state.hasError = 'Error';
    });
  },
});

export const { actions } = postsSlice;
