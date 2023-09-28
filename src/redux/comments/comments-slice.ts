/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { fetchComments } from './comments-operations';

import { Comment } from '../../types/Comment';

import {
  deleteComment as deleteCommentApi,
  createComment as addCommentApi,
} from '../../api/comments';

interface CommentsState {
  items: Comment[];
  loading: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loading: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    createComment(state, action) {
      state.items.push(action.payload);

      addCommentApi(action.payload);
    },
    removeComment(state, action) {
      state.items = state.items.filter(
        (comment) => comment.id !== action.payload,
      );

      deleteCommentApi(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        return {
          ...state,
          loading: true,
          hasError: false,
        };
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
          loading: false,
          hasError: false,
        };
      })
      .addCase(fetchComments.rejected, (state) => {
        return {
          ...state,
          loading: false,
          hasError: true,
        };
      });
  },
});

export const { createComment, removeComment } = commentsSlice.actions;

export default commentsSlice.reducer;
