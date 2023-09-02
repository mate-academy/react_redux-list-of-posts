/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createComment, deleteComment, getPostComments } from '../api/comments';

import { Comment } from '../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: true,
  hasError: false,
};

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeCommentImmediatly: (
      state: CommentsState,
      action: PayloadAction<number>,
    ) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state: CommentsState) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (
        state: CommentsState,
        action: PayloadAction<Comment[]>,
      ) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state: CommentsState) => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (
        state: CommentsState,
        action: PayloadAction<Comment>,
      ) => {
        state.items.push(action.payload);
      })
      .addCase(removeComment.fulfilled, (
        state: CommentsState,
        action: PayloadAction<number>,
      ) => {
        const comments = state.items.filter(
          comment => comment.id !== action.payload,
        );

        return {
          ...state,
          items: comments,
        };
      });
  },
});

export const { removeCommentImmediatly } = commentsSlice.actions;

export default commentsSlice.reducer;
