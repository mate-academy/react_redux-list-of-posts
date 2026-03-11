/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment } from '../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => commentsApi.getPostComments(postId),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    items: [] as Comment[],
    loaded: false,
    hasError: false,
  },
  reducers: {
    addComment: (state, action) => {
      state.items.push(action.payload);
    },

    deleteComment: (state, action) => {
      state.items = state.items.filter(c => c.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { addComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
