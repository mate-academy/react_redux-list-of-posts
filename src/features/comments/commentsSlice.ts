/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Comment } from '../../types';
import * as commentsApi from '../../api/comments';

export interface CommentsState {
  value: Comment[];
  status: 'idle' | 'loading' | 'failed';
  isSubmitting: boolean;
}

const initialState: CommentsState = {
  value: [],
  status: 'idle',
  isSubmitting: false,
};

export const loadComments = createAsyncThunk(
  'comments/getPostComments',
  async (postId: number) => {
    const value = await commentsApi.getPostComments(postId);

    return value;
  },
);

export const addComment = createAsyncThunk(
  'comments/createComment',
  async ({
    name,
    email,
    body,
    postId,
  }: Omit<Comment, 'id'>) => {
    const newComment = await commentsApi.createComment({
      name,
      email,
      body,
      postId,
    });

    return newComment;
  },
);

export const removeComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(loadComments.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addComment.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.value.push(action.payload);
      })
      .addCase(addComment.rejected, (state) => {
        state.isSubmitting = false;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.value = state.value
          .filter(comment => comment.id !== action.payload);
      });
  },
});

export const selectComments = (state: RootState) => state.comments;

export default commentsSlice.reducer;
