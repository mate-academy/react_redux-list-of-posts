/* eslint no-param-reassign: "error" */
import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

export type CommentsState = {
  items: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.items = action.payload;
    },

    addComment: (state, action) => {
      state.items.push(action.payload);
    },

    deleteComment: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    setLoadedFalse: (state) => {
      state.loaded = false;
    },

    setLoadedTrue: (state) => {
      state.loaded = true;
    },

    setHasError: (state) => {
      state.hasError = true;
    },

    resetError: (state) => {
      state.hasError = false;
    },
  },
});

export const {
  setComments,
  addComment,
  deleteComment,
  setLoadedFalse,
  setLoadedTrue,
  setHasError,
  resetError,
} = commentsSlice.actions;

export default commentsSlice.reducer;
