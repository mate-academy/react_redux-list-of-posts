/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as commentsApi from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';
import { RootState } from '../../app/store';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPostComments = createAsyncThunk(
  'comments/loadPostComments',
  async (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (comment: CommentData & { postId: number }) => {
    return commentsApi.createComment(comment);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPostComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.items = [];
      })
      .addCase(loadPostComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload;
      })
      .addCase(loadPostComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
        state.items = [];
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createComment.rejected, state => {
        state.hasError = true;
      })
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(
            comment => comment.id !== action.payload,
          );
        },
      );
  },
});

export const { clearComments } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.items;

export const selectCommentsLoaded = (state: RootState) => state.comments.loaded;

export const selectCommentsError = (state: RootState) =>
  state.comments.hasError;

export default commentsSlice.reducer;
