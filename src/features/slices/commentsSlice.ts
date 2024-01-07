/* eslint-disable no-param-reassign */
import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  addComments,
  deleteComments,
  fetchComments,
} from '../thunks/commentsThunk';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: boolean;
  submit: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: false,
  submit: false,
};

export const resetComments = createAction('comments/reset');

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
    clearComment: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetComments, () => initialState)
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addComments.pending, (state) => {
        state.submit = true;
      })
      .addCase(addComments.fulfilled, (state, action) => {
        state.submit = false;
        state.comments.push(action.payload);
      })
      .addCase(deleteComments.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export const commentsActions = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
