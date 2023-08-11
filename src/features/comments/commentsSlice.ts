/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { addComment, loadComments, removeComment } from './commentsThunk';
import { Comment } from '../../types/Comment';

interface Comments {
  loaded: boolean,
  hasError: boolean,
  comments: Comment[],
  isCommentsOk: boolean,
}

const initialState: Comments = {
  loaded: false,
  hasError: false,
  isCommentsOk: false,
  comments: [],
};

const comments = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment: (state, action) => {
      if (state.isCommentsOk) {
        state.comments = state.comments.filter(comment => (
          comment.id !== action.payload
        ));
      }
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

    builder.addCase(removeComment.fulfilled, (state) => {
      state.isCommentsOk = true;
    });

    builder.addCase(removeComment.rejected, (state) => {
      state.isCommentsOk = false;
    });
  },
});

export const { deleteComment } = comments.actions;
export const commentsReducer = comments.reducer;
