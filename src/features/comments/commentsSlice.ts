/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';

import { Comment, CommentData } from '../../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/loadComments',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: CommentData & { postId: number }) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
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
        state.items = action.payload;
        state.loaded = true;
      })

      .addCase(loadComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })

      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(addComment.rejected, state => {
        state.hasError = true;
      })

      .addCase(removeComment.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export default commentsSlice.reducer;
