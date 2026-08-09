/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createComment, deleteComment, getPostComments } from '../api/comments';

import { Comment, CommentData } from '../types/Comment';

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
  'comments/load',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async ({ postId, name, email, body }: CommentData & { postId: number }) => {
    return createComment({
      postId,
      name,
      email,
      body,
    });
  },
);

export const removeComment = createAsyncThunk(
  'comments/remove',
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
  },

  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })

      .addCase(loadComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload;
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

      .addCase(removeComment.pending, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.meta.arg,
        );
      });
  },
});

export const { clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;
