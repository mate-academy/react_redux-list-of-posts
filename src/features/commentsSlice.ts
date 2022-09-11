import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { Comment } from '../types/Comment';

export type CommentsState = {
  comments: Comment[],
  commentsIsLoading: boolean,
  commentsIsError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  commentsIsLoading: false,
  commentsIsError: true,
};

export const commentsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setComments: (state, action:PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    setCommentsIsLoading: (state, action:PayloadAction<boolean>) => {
      state.commentsIsLoading = action.payload;
    },
    setCommentsError: (state, action:PayloadAction<boolean>) => {
      state.commentsIsError = action.payload;
    },
  },
});

export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsIsLoading
  = (state: RootState) => state.comments.commentsIsLoading;
export const selectCommentsIsError
  = (state: RootState) => state.comments.commentsIsError;

export const {
  setComments,
  setCommentsIsLoading,
  setCommentsError,
} = commentsSlice.actions;

export default commentsSlice.reducer;
