/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type CommentData = {
  name: string;
  email: string;
  body: string;
};

type CommentState = {
  errors: CommentData;
  loading: boolean;
  commentData: CommentData;
};

export const defaultErrorValues: CommentData = {
  name: '',
  email: '',
  body: '',
};

export const defaultCommentData: CommentData = {
  name: '',
  email: '',
  body: '',
};

const initialState: CommentState = {
  errors: defaultErrorValues,
  loading: false,
  commentData: defaultCommentData,
};

const newCommentFormSlice = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    setCommentData: (state, action: PayloadAction<CommentData>) => {
      state.commentData = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setErrors: (state, action: PayloadAction<CommentData>) => {
      state.errors = action.payload;
    },
  },
});

export const { setCommentData, setIsLoading, setErrors } =
  newCommentFormSlice.actions;

export default newCommentFormSlice.reducer;
