/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CommentData } from '../../types/Comment';

export const defaultErrorValues = {
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

const initialState = {
  errors: defaultErrorValues,
  commentData: defaultCommentData,
  isLoading: false,
};

const newCommentFormSlice = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setCommentData: (state, action) => {
      state.commentData = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default newCommentFormSlice.reducer;
export const { setIsLoading, setCommentData, setErrors }
  = newCommentFormSlice.actions;
