/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

export interface CommentsSlice {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: CommentsSlice = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCommentsLoading(state) {
      state.loaded = false;
    },

    setComments(state, action: PayloadAction<Comment[]>) {
      state.loaded = true;
      state.hasError = false;
      state.comments = action.payload;
    },

    setCommentsError(state) {
      state.loaded = true;
      state.hasError = true;
    },

    commentDelete(state, action: PayloadAction<number>) {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
  },
});

export const {
  setCommentsLoading,
  setCommentsError,
  setComments,
  commentDelete,
} = commentSlice.actions;

export default commentSlice.reducer;
