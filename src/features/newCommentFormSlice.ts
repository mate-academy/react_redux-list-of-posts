/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormFields {
  name: string;
  email: string;
  body: string;
}

interface Errors {
  name: boolean;
  email: boolean;
  body: boolean;
}

export interface NewCommentFormState {
  fields: FormFields;
  errors: Errors;
}

const initialState: NewCommentFormState = {
  fields: {
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

const newCommentForm = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    setFields(state, { payload }: PayloadAction<FormFields>) {
      state.fields = payload;
    },
    setError(state, { payload }: PayloadAction<Errors>) {
      state.errors = payload;
    },
    clear() {
      return initialState;
    },
  },
});

export const { setFields, clear, setError } = newCommentForm.actions;

export default newCommentForm.reducer;
