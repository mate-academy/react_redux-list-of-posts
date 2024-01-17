import { PayloadAction } from '@reduxjs/toolkit';
import { CommentsState } from './commentsSlice';
import { Comment } from '../../types/Comment';

export const setError = (state: CommentsState) => {
  state.loading = false;
  state.hasError = true;
};

export const startLoading = (state: CommentsState) => {
  state.loading = true;
  state.hasError = false;
};

export const localeAddComment = (
  state: CommentsState,
  action: PayloadAction<Comment>,
) => {
  state.comments.push(action.payload);
};

export const setComments = (
  state: CommentsState,
  action: PayloadAction<Comment[]>,
) => {
  state.comments = action.payload;
  state.loading = false;
};
