/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

type CommentsState = {
  commentsList: Comment[],
  loading: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  commentsList: [],
  loading: false,
  hasError: false,
};

export const getCommentsById = createAsyncThunk(
  'comments/fetchComments', (postId: number) => getPostComments(postId),
);

export const createNewComment = createAsyncThunk(
  'comments/createComment', (data: Omit<Comment, 'id'>) => createComment(data),
);

export const deleteExistingComment = createAsyncThunk(
  'comments/deleteComment', (commentId: number) => deleteComment(commentId),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action: PayloadAction<number>) => {
      state.commentsList = state.commentsList.filter(comment => (
        comment.id !== action.payload
      ));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsById.pending, (state) => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(getCommentsById.fulfilled, (state, action) => {
        state.loading = false;
        state.commentsList = action.payload;
      })
      .addCase(getCommentsById.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });

    builder
      .addCase(createNewComment.fulfilled, (state, action) => {
        state.commentsList.push(action.payload);
      })
      .addCase(createNewComment.rejected, (state) => {
        state.hasError = true;
      });

    builder
      .addCase(deleteExistingComment.fulfilled, (state, action) => {
        state.hasError = false;
        state.commentsList = state.commentsList.filter(comment => (
          comment.id !== action.meta.arg
        ));
      })
      .addCase(deleteExistingComment.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export const { removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
