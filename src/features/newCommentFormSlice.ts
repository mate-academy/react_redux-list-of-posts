/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type NewCommentFormErrors = {
  name: boolean,
  email: boolean,
  body: boolean,
};

type NewCommentFormValues = {
  name: string,
  email: string,
  body: string,
};

type NewCommentFormState = {
  submitting: boolean,
  errors: NewCommentFormErrors,
  values: NewCommentFormValues,
};

const initialState: NewCommentFormState = {
  submitting: false,
  errors: {
    name: false,
    email: false,
    body: false,
  },
  values: {
    name: '',
    email: '',
    body: '',
  },
};

const newCommentFormSlice = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.submitting = action.payload;
    },
    setErrors: (state, action: PayloadAction<NewCommentFormErrors>) => {
      state.errors = action.payload;
    },
    setValues: (state, action: PayloadAction<NewCommentFormValues>) => {
      state.values = action.payload;
    },
    clear: () => initialState,
  },
});

export default newCommentFormSlice.reducer;
export const { actions } = newCommentFormSlice;
