/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NewCommentFormState {
  name: string;
  email: string;
  body: string;
  submitting: boolean;
  errors: {
    name: boolean;
    email: boolean;
    body: boolean;
  };
}

const initialState: NewCommentFormState = {
  name: '',
  email: '',
  body: '',
  submitting: false,
  errors: {
    name: false,
    email: false,
    body: false,
  },
};

const newCommentFormSlice = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    setField(
      state,
      action: PayloadAction<{
        field: 'name' | 'email' | 'body';
        value: string;
      }>,
    ) {
      const { field, value } = action.payload;

      if (field in state) {
        state[field] = value;
      }

      if (field in state.errors) {
        state.errors[field as keyof typeof state.errors] = false;
      }
    },
    setSubmitting(state, action: PayloadAction<boolean>) {
      state.submitting = action.payload;
    },
    setErrors(state, action) {
      state.errors = { ...state.errors, ...action.payload };
    },
    clearForm(
      state,
      action: PayloadAction<{ name?: string; email?: string } | undefined>,
    ) {
      state.name = action.payload?.name ?? '';
      state.email = action.payload?.email ?? '';
      state.body = '';
      state.submitting = false;
      state.errors = {
        name: false,
        email: false,
        body: false,
      };
    },
  },
});

export const { setField, setSubmitting, setErrors, clearForm } =
  newCommentFormSlice.actions;

export default newCommentFormSlice.reducer;
