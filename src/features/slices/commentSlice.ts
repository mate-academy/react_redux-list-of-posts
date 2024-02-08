/* eslint-disable no-param-reassign */
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
// eslint-disable-next-line max-len
import { addComments, deleteComments, fetchComments } from '../thunks/commentThunk';

export type CommentsState = {
  comments: Comment[];
  isLoading: boolean;
  hasError: boolean;
  isSubmitting: boolean;
};

const initialState: CommentsState = {
  comments: [],
  isLoading: true,
  hasError: false,
  isSubmitting: false,
};

export const resetComments = createAction('comments/reset');

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
    clearComment: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetComments, () => initialState)
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(addComments.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(addComments.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.comments.push(action.payload);
      })
      .addCase(deleteComments.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export default commentSlice.reducer;
export const { removeComment, clearComment } = commentSlice.actions;
