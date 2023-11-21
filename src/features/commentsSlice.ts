/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getPostComments,
  deleteComment,
  createComment,
} from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const setPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const removeComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  ({
    name, email, body, postId,
  }: Omit<Comment, 'id'>) => {
    return createComment({
      name, email, body, postId,
    });
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setPostComments.pending, (state) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(setPostComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.comments = action.payload;
      })
      .addCase(setPostComments.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      })

      .addCase(removeComment.fulfilled, (state, action) => {
        state.comments = state.comments
          .filter(comment => comment.id !== action.payload);
      })
      .addCase(removeComment.rejected, (state) => {
        state.hasError = true;
      })

      .addCase(addComment.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
      })
      .addCase(addComment.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
