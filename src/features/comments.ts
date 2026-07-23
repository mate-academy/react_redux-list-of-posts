/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

interface CommentsState {
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
    setCommentsStart: state => {
      state.loaded = false;
      state.hasError = false;
    },
    setCommentsSuccess: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
    setCommentsError: state => {
      state.loaded = true;
      state.hasError = true;
    },
    addCommentSuccess: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    deleteCommentSuccess: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const {
  setCommentsStart,
  setCommentsSuccess,
  setCommentsError,
  addCommentSuccess,
  deleteCommentSuccess,
} = commentsSlice.actions;

export default commentsSlice.reducer;
