/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

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
    commentsLoading: state => {
      state.loaded = false;
      state.hasError = false;
    },
    commentsLoaded: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
    commentsError: state => {
      state.loaded = true;
      state.hasError = true;
    },
    clearComments: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
});

export const {
  commentsLoading,
  commentsLoaded,
  commentsError,
  clearComments,
  addComment,
  removeComment,
} = commentsSlice.actions;
export default commentsSlice.reducer;
