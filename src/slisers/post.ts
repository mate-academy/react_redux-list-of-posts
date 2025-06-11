/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { fetchPost } from './asyncThunk';

export interface Init {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
}

const initialState: Init = {
  loaded: false,
  hasError: false,
  items: [],
};

const posts = createSlice({
  name: 'post',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchPost.pending, state => {
        state.loaded = true;
        state.hasError = false;
      })

      .addCase(fetchPost.fulfilled, (state, action) => {
        state.items = action.payload;
        state.hasError = false;
        state.loaded = true;
      })

      .addCase(fetchPost.rejected, state => {
        state.hasError = true;
        state.loaded = false;
      });
  },
});

export default posts.reducer;
