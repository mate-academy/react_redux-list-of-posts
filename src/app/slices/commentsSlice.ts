/* eslint-disable no-param-reassign */
import { createAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  deleteComment,
  loadComments,
  postComment,
} from '../thunks/commentsThunk';

type CommentsState = {
  comments: Comment[],
  isLoading: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  hasError: false,
};

export const resetComments = createAction('comments/reset');

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action) => {
      return {
        ...state,
        comments: state.comments
          .filter((comment) => comment.id !== action.payload),
      };
    },
    clearComments: state => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetComments, () => {
        return initialState;
      })
      .addCase(loadComments.pending, (state) => {
        return {
          ...state,
          isLoading: false,
        };
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: true,
          comments: action.payload,
        };
      })
      .addCase(loadComments.rejected, (state) => {
        return {
          ...state,
          isLoading: true,
          hasError: true,
        };
      })
      .addCase(postComment.pending, (state) => {
        return {
          ...state,
          isSubmitting: true,
        };
      })
      .addCase(postComment.fulfilled, (state, action) => {
        return {
          ...state,
          comments: [...state.comments, action.payload],
          isSubmitting: false,
        };
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        return {
          ...state,
          comments: state.comments
            .filter((comment) => comment.id !== action.payload),
        };
      });
  },
});

export const { removeComment, clearComments } = commentSlice.actions;

export default commentSlice.reducer;
