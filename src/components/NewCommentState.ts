/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CommentData } from '../types/Comment';

interface Error {
  nameError : boolean, emailError: boolean, bodyError: boolean
}

export interface InitialStoreCommentData {
  value: CommentData;
  error: Error;
  submitting: boolean;
}

const initialState: InitialStoreCommentData = {
  value: { name: '', email: '', body: '' },
  error: { nameError: false, emailError: false, bodyError: false },
  submitting: false,
};

export const CommentDataSlice = createSlice({
  name: 'commentData',
  initialState,
  reducers: {
    setComment: (state, action:PayloadAction<CommentData>) => {
      state.value = action.payload;
    },
    clearComment: state => {
      state.value = { name: '', email: '', body: '' };
    },
    setError: (state, action:PayloadAction<Error>) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = { nameError: false, emailError: false, bodyError: false };
    },
    setsubmitting: (state, action: PayloadAction<boolean>) => {
      state.submitting = action.payload;
    },
  },
});

export default CommentDataSlice.reducer;
