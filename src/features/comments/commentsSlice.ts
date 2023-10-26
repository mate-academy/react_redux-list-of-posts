/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  addComment, deleteComment, loadComments,
} from '../../thunks/commentsThunk';
import { Comment } from '../../types/Comment';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  isError: boolean;
  currentComments: Comment[];
};

const initialState: CommentsState = {
  comments: [],
  isError: false,
  loaded: true,
  currentComments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    localDeleteComment: (state, action) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadComments.pending, (state) => {
      state.loaded = false;
      state.isError = false;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.comments = action.payload;
    });

    builder.addCase(loadComments.rejected, (state) => {
      state.loaded = true;
      state.isError = true;
      state.comments = [];
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments = [...state.comments, action.payload];
    });

    builder.addCase(addComment.rejected, (state) => {
      state.isError = true;
    });

    builder.addCase(deleteComment.pending, (state) => {
      state.isError = false;
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    });

    builder.addCase(deleteComment.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const { localDeleteComment } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
