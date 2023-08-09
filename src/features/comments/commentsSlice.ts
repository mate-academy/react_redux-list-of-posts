/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { addComment, loadComments } from './commentsThunk';
import { Comment } from '../../types/Comment';

interface Comments {
  loaded: boolean,
  hasError: boolean,
  comments: Comment[],
}

const initialState: Comments = {
  loaded: false,
  hasError: false,
  comments: [],
};

const comments = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(comment => (
        comment.id !== action.payload
      ));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.comments = action.payload;
    });

    builder.addCase(loadComments.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(loadComments.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments = [...state.comments, action.payload];
    });

    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export const { deleteComment } = comments.actions;
export const commentsReducer = comments.reducer;
