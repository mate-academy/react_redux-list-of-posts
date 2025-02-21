/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  getPostComments,
  deleteComment as deleteCommentById,
} from '../api/comments';
import { Comment } from '../types/Comment';

const initialState = {
  loaded: false,
  hasError: false,
  items: [] as Comment[],
  submitting: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const addNewComment = createAsyncThunk(
  'comments/create',
  (comment: Omit<Comment, 'id'>) => {
    return createComment(comment);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteCommentById(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(init.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
    builder.addCase(addNewComment.pending, state => {
      state.submitting = true;
    });
    builder.addCase(addNewComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.submitting = false;
    });
    builder.addCase(addNewComment.rejected, state => {
      state.submitting = false;
      state.hasError = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    });
    builder.addCase(deleteComment.rejected, state => {
      state.hasError = true;
    });
  },
});
