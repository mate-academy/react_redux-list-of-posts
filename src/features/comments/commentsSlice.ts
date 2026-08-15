/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

import { Comment, CommentData } from '../../types/Comment';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadComments = createAsyncThunk(
  'comments/loadComments',
  async (postId: number) => getPostComments(postId),
);

type AddCommentPayload = {
  postId: number;
  data: CommentData;
};

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ postId, data }: AddCommentPayload) =>
    createComment({
      ...data,
      postId,
    }),
);

export const deleteCommentRequest = createAsyncThunk(
  'comments/deleteCommentRequest',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,

  reducers: {
    clearComments: state => {
      state.loaded = false;
      state.hasError = false;
      state.items = [];
    },

    removeComment: (state, action) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },

    restoreComment: (state, action) => {
      state.items.push(action.payload);
    },

    clearCommentsError: state => {
      state.hasError = false;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.items = [];
      })

      .addCase(loadComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload;
      })

      .addCase(loadComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
        state.items = [];
      })

      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.hasError = false;
      })

      .addCase(addComment.rejected, state => {
        state.hasError = true;
      });
  },
});

export const {
  clearComments,
  removeComment,
  restoreComment,
  clearCommentsError,
} = commentsSlice.actions;

export default commentsSlice.reducer;
