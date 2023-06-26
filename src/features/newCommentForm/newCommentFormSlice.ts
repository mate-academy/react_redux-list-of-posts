/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ErrorForForm = {
  name: boolean;
  email: boolean;
  body: boolean;
};

export type NewComment = {
  name: string;
  email: string;
  body: string;
};

type InitialState = {
  errors: ErrorForForm;
  newComment: NewComment
};

const initialState: InitialState = {
  errors: {
    name: false,
    email: false,
    body: false,
  },
  newComment: {
    name: '',
    email: '',
    body: '',
  },
};

const newCommentFormSlice = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    setErrors: (state, actions: PayloadAction<ErrorForForm>) => {
      state.errors = actions.payload;
    },
    setNewComment: (state, actions: PayloadAction<NewComment>) => {
      state.newComment = actions.payload;
    },
  },
});

export default newCommentFormSlice.reducer;
export const { setErrors, setNewComment } = newCommentFormSlice.actions;
