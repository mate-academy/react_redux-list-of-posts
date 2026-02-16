/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentData } from '../../../types/Comment';

type ErrorsType = {
  name: boolean;
  email: boolean;
  body: boolean;
};

interface FormState {
  values: CommentData;
  errors: ErrorsType;
  submitting: boolean;
}

const initialState: FormState = {
  values: { name: '', email: '', body: '' },
  errors: { name: false, email: false, body: false },
  submitting: false,
};

const newCommentFormSlice = createSlice({
  name: 'commentForm',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<Partial<CommentData>>) => {
      state.values = { ...state.values, ...action.payload };
    },
    setErrors: (state, action: PayloadAction<ErrorsType>) => {
      state.errors = action.payload;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.submitting = action.payload;
    },
    clearForm: state => {
      state.values = { name: '', email: '', body: '' };
      state.errors = { name: false, email: false, body: false };
    },
  },
});

export const { setValue, setErrors, setSubmitting, clearForm } =
  newCommentFormSlice.actions;

export default newCommentFormSlice.reducer;
