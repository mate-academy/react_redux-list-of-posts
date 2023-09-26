/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { addComment, loadComments } from '../thunks/commentsThunk';

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(comment => {
        return comment.id !== action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadComments.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.comments = action.payload;
    });

    builder.addCase(loadComments.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
      state.comments = [];
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments = [...state.comments, action.payload];
    });

    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export const { deleteComment } = commentsSlice.actions;

export const commentsReducer = commentsSlice.reducer;

export interface CommentsState {
  loaded: boolean,
  hasError: boolean,
  comments: Comment[],
}
