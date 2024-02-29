/* eslint-disable no-param-reassign */
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const fetchCommentsAsync
  = createAsyncThunk(
    'comments/fetch',
    (postId: number) => getPostComments(postId),
  );

export const deleteCommentAsync
  = createAsyncThunk(
    'comments/delete',
    (commentId: number) => {
      deleteComment(commentId);

      return commentId;
    },
  );

export const addCommentAsync
  = createAsyncThunk(
    'comments/add',
    (comment: Omit<Comment, 'id'>) => createComment(comment),
  );

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchCommentsAsync.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(
      fetchCommentsAsync.fulfilled,
      (state: CommentsState, action: PayloadAction<Comment[]>) => {
        state.loaded = true;
        state.comments = action.payload;
      },
    );

    builder.addCase(fetchCommentsAsync.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(
      addCommentAsync.fulfilled,
      (state: CommentsState, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
      },
    );

    builder.addCase(addCommentAsync.pending, (state) => {
      state.hasError = false;
    });

    builder.addCase(addCommentAsync.rejected, (state) => {
      state.hasError = true;
    });

    builder.addCase(deleteCommentAsync.fulfilled,
      (state, action) => {
        state.comments = state.comments
          .filter(comment => comment.id !== action.payload);
      });

    builder.addCase(deleteCommentAsync.pending, (state) => {
      state.hasError = false;
    });

    builder.addCase(deleteCommentAsync.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
