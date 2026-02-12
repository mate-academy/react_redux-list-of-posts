/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { addNewComment, fetchComments, removeComment } from './asyncActions';

type Comments = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: Comments = {
  comments: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(
      fetchComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.loaded = true;
      },
    );
    builder.addCase(fetchComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(addNewComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
    builder.addCase(addNewComment.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    });
    builder.addCase(removeComment.rejected, state => {
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
