/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'posts/loadComments',
  async (postId: number) => {
    const result = await getPostComments(postId);

    return result;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addNewComment: (state, action) => {
      state.items.push(action.payload);
    },
    removeComment: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })

      .addCase(loadComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })

      .addCase(loadComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { addNewComment } = commentsSlice.actions;
export const { removeComment } = commentsSlice.actions;
