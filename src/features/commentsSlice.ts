/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    startLoading(state) {
      state.loaded = false;
      state.hasError = false;
    },

    setComments(state, action: PayloadAction<Comment[]>) {
      state.items = action.payload;
      state.loaded = true;
    },

    setError(state) {
      state.hasError = true;
      state.loaded = true;
    },

    addComment(state, action: PayloadAction<Comment>) {
      state.items.push(action.payload);
    },

    removeComment(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },

    clearComments(state) {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
});

export const {
  startLoading,
  setComments,
  setError,
  addComment,
  removeComment,
  clearComments,
} = commentsSlice.actions;

export default commentsSlice.reducer;
