/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Comment } from '../../types/Comment';
import { addComment, fetchComments, removeComment } from './operations';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteCom: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(com => com.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = true;
      state.hasError = false;
    });

    builder.addCase(fetchComments.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loaded = false;
      state.comments = action.payload;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.comments.filter(com => com.id !== action.payload);
    });
  },
});

export default commentsSlice.reducer;
export const { deleteCom } = commentsSlice.actions;
