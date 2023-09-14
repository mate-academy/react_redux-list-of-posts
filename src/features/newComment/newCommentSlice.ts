/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CommentData } from '../../types/Comment';

type NewCommentErrors = {
  name: boolean,
  email: boolean,
  body: boolean,
};

type NewCommentState = {
  comment: CommentData,
  errors: NewCommentErrors,
};

const initialState: NewCommentState = {
  comment: {
    name: '',
    email: '',
    body: '',
  },
  errors: {
    name: false,
    email: false,
    body: false,
  },
};

export const newCommentSlice = createSlice({
  name: 'newComment',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.comment.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.comment.email = action.payload;
    },
    setBody: (state, action: PayloadAction<string>) => {
      state.comment.body = action.payload;
    },
    setState: (state, action: PayloadAction<CommentData>) => {
      state.comment = action.payload;
    },
    setErrors: (state, action: PayloadAction<NewCommentErrors>) => {
      state.errors = action.payload;
    },
    clearComment: (state) => {
      state.comment = initialState.comment;
    },
    clearErrors: (state) => {
      state.errors = initialState.errors;
    },
  },
});

export const newCommentReducer = newCommentSlice.reducer;
export const {
  setName,
  setBody,
  setEmail,
  setErrors,
  setState,
  clearComment,
  clearErrors,
} = newCommentSlice.actions;
