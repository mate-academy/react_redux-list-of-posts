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
    setSubmitting: (state, actions: PayloadAction<boolean>) => {
      state.submitting = actions.payload;
    },
    setErrors: (state, actions: PayloadAction<NewCommentFormErrors>) => {
      state.errors = actions.payload;
    },
    setValues: (state, actions: PayloadAction<NewCommentFormValues>) => {
      state.values = actions.payload;
    },
    clear: () => initialState,
  },
});

export default newCommentFormSlice.reducer;
export const { actions } = newCommentFormSlice;
