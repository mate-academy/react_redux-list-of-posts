/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getPostComments,
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
} from '../../api/comments';
import { Comment } from '../../types/Comment';
import { RootState } from '../../app/store';

export const loadComments = createAsyncThunk(
  'comments/loadComments',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  (commentData: Comment) => {
    return createCommentApi(commentData);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  (commentId: number) => {
    deleteCommentApi(commentId);

    return commentId;
  },
);

const initialState = {
  comments: [] as Comment[],
  loaded: false,
  hasError: false,
  submitting: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.comments = action.payload;
      })
      .addCase(loadComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(createComment.pending, state => {
        state.submitting = true;
        state.hasError = false;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.submitting = false;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, state => {
        state.submitting = false;
        state.hasError = true;
      })
      .addCase(deleteComment.pending, state => {
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(deleteComment.rejected, state => {
        state.hasError = true;
      });
  },
});

export const selectComments = (state: RootState) => state.comments.comments;
export const selectLoaded = (state: RootState) => state.comments.loaded;
export const selectHasError = (state: RootState) => state.comments.hasError;

export default commentsSlice.reducer;
