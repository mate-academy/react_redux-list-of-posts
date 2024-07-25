/* eslint-disable no-param-reassign */
/* eslint-disable */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from './types/Comment';
import { createComment, deleteComment, getPostComments } from './api/comments';

type initialComments = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: initialComments = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(commentsAsync.pending, state => {
      state.loaded = false;
      state.hasError = false;
    }),
      builder.addCase(commentsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      }),
      builder.addCase(commentsAsync.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      }),
      builder.addCase(commentsDeleteAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      }),
      builder.addCase(commentsDeleteAsync.rejected, state => {
        state.hasError = true;
      }),
      builder.addCase(commentsAddAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      }),
      builder.addCase(commentsAddAsync.rejected, state => {
        state.hasError = true;
      });
  },
});

export const commentsAsync = createAsyncThunk(
  'comments/fetch',
  (commentId: number) => {
    return getPostComments(commentId);
  },
);

export const commentsDeleteAsync = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsAddAsync = createAsyncThunk(
  'comments/add',
  async (comment: Omit<Comment, 'id'>) => {
    const value = await createComment(comment);

    return value;
  },
);

export default commentsSlice.reducer;
