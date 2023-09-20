/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type InitialState = {
  loaded: boolean,
  hasError: boolean,
  items: Post[];
};

const initialState: InitialState = {
  loaded: true,
  hasError: false,
  items: [],
};

export const init = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPost: (state) => {
      state.items = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(init.pending, (state) => {
      return { ...state, loaded: false };
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, loaded: true, items: action.payload };
    });
    builder.addCase(init.rejected, (state) => {
      return { ...state, loaded: true, hasError: true };
    });
  },
});

export const { actions } = postsSlice;
