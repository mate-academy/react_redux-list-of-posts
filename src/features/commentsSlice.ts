/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';
import * as commentsApi from '../api/comments';

export interface CommentsState {
  comments: Comment[];
  status: 'idle' | 'loading' | 'failed';
  error: boolean;
}
const initialState: CommentsState = {
  comments: [],
  status: 'idle',
  error: false,
};

export const loadComments = createAsyncThunk(
  'comments/SET',
  (async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  }),
);

export const addComment = createAsyncThunk(
  'comments/ADD',
  (async (comment: CommentData) => {
    const newComment = await commentsApi.createComment(comment);

    return newComment;
  }),
);

export const deleteComment = createAsyncThunk(
  'comments/DELETE',
  (async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  }),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, { payload }) => {
      state.comments = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadComments.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.comments = payload;
      })
      .addCase(loadComments.rejected, (state) => {
        state.status = 'failed';
        state.error = true;
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.comments = [...state.comments, payload];
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        state.comments = state.comments
          .filter(({ id }) => id !== payload);
      });
  },
});

export const { setComments } = commentsSlice.actions;

export default commentsSlice.reducer;
