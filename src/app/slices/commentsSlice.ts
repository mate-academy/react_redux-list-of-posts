/* eslint-disable no-param-reassign */
import { createAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  addComments,
  deleteComments,
  fetchComments,
} from '../thunks/commentThunk';

export type CommentsState = {
  comments: Comment[];
  isLoaded: boolean;
  hasError: boolean;
};

const initialState:CommentsState = {
  comments: [],
  isLoaded: false,
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
          .filter(comment => comment.id !== action.payload),
      };
    },
    clearComment: state => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetComments, () => {
        return initialState;
      })
      .addCase(fetchComments.pending, (state) => {
        return {
          ...state,
          isLoaded: false,
        };
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        return {
          ...state,
          isLoaded: true,
          comments: action.payload,
        };
      })
      .addCase(fetchComments.rejected, (state) => {
        return {
          ...state,
          isLoaded: true,
          hasError: true,
        };
      })
      .addCase(addComments.pending, (state) => {
        return {
          ...state,
          isSubmitting: true,
        };
      })
      .addCase(addComments.fulfilled, (state, action) => {
        return {
          ...state,
          isSubmitting: false,
          comments: [...state.comments, action.payload],
        };
      })
      .addCase(deleteComments.fulfilled, (state, action) => {
        return {
          ...state,
          comments: state.comments
            .filter((comment) => comment.id !== action.payload),
        };
      });
  },
});

export default commentSlice.reducer;
export const { removeComment, clearComment } = commentSlice.actions;
