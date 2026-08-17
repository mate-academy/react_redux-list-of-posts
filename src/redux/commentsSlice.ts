/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  comments: [],
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
      state.comments = action.payload;
      state.hasError = false;
      state.loaded = true;
    },

    setError: state => {
      state.hasError = true;
      state.loaded = true;
    },

    clearComments: state => {
      state.comments = [];
      state.hasError = false;
      state.loaded = false;
    },

    addCommentAction: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },

    deleteCommentAction: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
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
