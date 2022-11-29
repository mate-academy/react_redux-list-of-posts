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

const commentSlice = createSlice({
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
  },
});

export const {
  setCommentsLoading,
  setCommentsError,
  setComments,
} = commentSlice.actions;

export default commentSlice.reducer;
