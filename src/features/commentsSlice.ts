/* eslint-disable @typescript-eslint/indent */
// src/features/comments/commentsSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/extensions
import { Comment, CommentData } from '../types/Comment';
import * as commentsApi from '../api/comments';
import type { RootState } from '../app/store';

type CommentsState = {
  itemsByPostId: Record<number, Comment[]>;
  loading: boolean;
  hasError: boolean;
  visibleForPostId: number | null;
};

const initialState: CommentsState = {
  itemsByPostId: {},
  loading: false,
  hasError: false,
  visibleForPostId: null,
};

export const loadComments = createAsyncThunk<
  { postId: number; comments: Comment[] },
  number
>('comments/loadComments', async (postId: number) => {
  const comments = await commentsApi.getPostComments(postId);

  return { postId, comments };
});

export const addComment = createAsyncThunk<
  { postId: number; comment: Comment },
  { postId: number; data: CommentData }
>('comments/addComment', async ({ postId, data }) => {
  const newComment = await commentsApi.createComment({
    ...data,
    postId,
  });

  return { postId, comment: newComment };
});

// eslint-disable-next-line prettier/prettier, max-len
export const deleteComment = createAsyncThunk<
  { postId: number; commentId: number },
  { postId: number; commentId: number }
>('comments/deleteComment', async ({ postId, commentId }) => {
  // eslint-disable-next-line prettier/prettier
  await commentsApi.deleteComment(commentId);

  // eslint-disable-next-line @typescript-eslint/indent
  return { postId, commentId };
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    showCommentForm(state, action: PayloadAction<number>) {
      // eslint-disable-next-line no-param-reassign
      state.visibleForPostId = action.payload;
    },
    hideCommentForm(state) {
      // eslint-disable-next-line no-param-reassign
      state.visibleForPostId = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loading = true;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;

        // eslint-disable-next-line no-param-reassign
        state.loading = false;
        // eslint-disable-next-line no-param-reassign
        state.itemsByPostId[postId] = comments;
      })
      .addCase(loadComments.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.loading = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        const current = state.itemsByPostId[postId] || [];

        // eslint-disable-next-line no-param-reassign
        state.itemsByPostId[postId] = [...current, comment];
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { postId, commentId } = action.payload;
        const current = state.itemsByPostId[postId] || [];

        // eslint-disable-next-line no-param-reassign
        state.itemsByPostId[postId] = current.filter(c => c.id !== commentId);
      });
  },
});

export const { showCommentForm, hideCommentForm } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;

// selectors
export const selectCommentsByPostId =
  // eslint-disable-next-line prettier/prettier, max-len


    (postId: number) =>
    (state: RootState): Comment[] =>
      state.comments.itemsByPostId[postId] || [];

export const selectCommentsLoading = (state: RootState) =>
  state.comments.loading;

export const selectCommentsError = (state: RootState) =>
  state.comments.hasError;

export const selectIsCommentFormVisibleForPost =
  (postId: number) => (state: RootState) =>
    state.comments.visibleForPostId === postId;
