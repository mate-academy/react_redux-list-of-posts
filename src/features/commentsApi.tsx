/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
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
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(c => c.id !== action.payload);
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    clearComments: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
});

export const {
  setComments,
  addComment,
  deleteComment,
  setLoaded,
  setHasError,
  clearComments,
} = commentsSlice.actions;

export default commentsSlice.reducer;
/* eslint-disable */
