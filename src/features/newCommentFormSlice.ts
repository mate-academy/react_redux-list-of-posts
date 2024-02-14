/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CommentData } from '../types/Comment';

export const defaultErrorValues: ErrorMessages = {
  name: '',
  email: '',
  body: '',
  server: '',
};

export const defaultCommentData: CommentData = {
  name: '',
  email: '',
  body: '',
};

interface ErrorMessages {
  name: string,
  email: string,
  body: string,
  server: string,
}

const initialState = {
  errors: defaultErrorValues,
  commentData: defaultCommentData,
  isLoading: false,
};

const newCommentFormSlice = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    setErrors: (state, action: PayloadAction<ErrorMessages>) => {
      state.errors = action.payload;
    },
    setCommentData: (state, action: PayloadAction<CommentData>) => {
      state.commentData = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const newCommentFormReducer = newCommentFormSlice.reducer;
export const {
  setIsLoading,
  setCommentData,
  setErrors,
} = newCommentFormSlice.actions;
