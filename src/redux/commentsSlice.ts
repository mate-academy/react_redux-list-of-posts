/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setLoading: state => {
      state.hasError = false;
      state.loaded = false;
    },

    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
      state.hasError = false;
      state.loaded = true;
    },

    setError: state => {
      state.hasError = true;
      state.loaded = true;
    },

    clearComments: state => {
      state.items = [];
      state.hasError = false;
      state.loaded = false;
    },

    addCommentAction: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },

    deleteCommentAction: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
});

export const {
  addCommentAction,
  deleteCommentAction,
  setComments,
  setError,
  setLoading,
  clearComments,
} = commentsSlice.actions;

export default commentsSlice.reducer;
