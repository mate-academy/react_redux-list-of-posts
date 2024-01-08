/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentsState = {
  loaded: boolean,
  hasError: boolean,
  comments: Comment[],
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  comments: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
  },
});

export default commentsSlice.reducer;
export const {
  setComments,
  setLoading,
  setError,
  addComment,
  removeComment,
} = commentsSlice.actions;
