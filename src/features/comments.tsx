/* eslint no-param-reassign: ["error", { "props": false }] */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: Comment[],
  loaded: boolean,
  error: boolean
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  error: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    setCommentsError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setCommentsLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
  },
});

export default commentsSlice.reducer;
export const {
  setComments, setCommentsError, setCommentsLoaded,
} = commentsSlice.actions;
