/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  getPostComments,
  createComment,
  deleteComment as deleteCommentApi,
} from '../../api/comments';

export const loadComments = createAsyncThunk(
  'comments/load',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

export const addComment = createAsyncThunk(
  'comments/add',
  async ({
    postId,
    name,
    email,
    body,
  }: {
    postId: number;
    name: string;
    email: string;
    body: string;
  }) => {
    const newComment = await createComment({
      postId,
      name,
      email,
      body,
    });

    return newComment;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteCommentApi(commentId);

    return commentId;
  },
);

const startCommentsState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: startCommentsState,
  reducers: {
    clearComments: state => {
      state.items = [];
      state.loaded = false;
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
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(loadComments.rejected, state => {
        state.loaded = false;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
