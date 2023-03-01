/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  getPostComments, createComment, deleteComment,
} from '../../api/comments';

type CommentsState = {
  items: Comment[],
  hasError: boolean,
  loaded: boolean,
};

const initialState: CommentsState = {
  items: [],
  hasError: false,
  loaded: false,
};

export const getComments = createAsyncThunk(
  'comments/load',
  async (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (data: Omit<Comment, 'id'>) => createComment(data),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action: PayloadAction<number>) => {
      const commentId = action.payload;

      state.items = state.items.filter(comment => (
        comment.id !== commentId
      ));
      deleteComment(commentId);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(getComments.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export const { removeComment } = commentsSlice.actions;

export default commentsSlice.reducer;
