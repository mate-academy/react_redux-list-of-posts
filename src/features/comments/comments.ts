/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Comment } from '../../types/Comment';

import {
  addNewComment,
  loadComments,
  removeComment,
} from './commentsAsyncActions';

type CommentsInitialState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsInitialState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => {
      state.loaded = true;
      state.hasError = false;
    });

    builder.addCase(
      loadComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.loaded = false;
        state.comments = action.payload;
      },
    );

    builder.addCase(loadComments.rejected, state => {
      state.loaded = false;
      state.hasError = true;
    });

    builder.addCase(addNewComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    });
  },
});

export default commentSlice.reducer;
