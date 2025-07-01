import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommentFormErrors {
  name: boolean;
  email: boolean;
  body: boolean;
}

export interface CommentFormState {
  name: string;
  email: string;
  body: string;
  isSubmitting: boolean;
  errors: CommentFormErrors;
}

const initialState: CommentFormState = {
  name: '',
  email: '',
  body: '',
  isSubmitting: false,
  errors: {
    name: false,
    email: false,
    body: false,
  },
};

export const commentFormSlice = createSlice({
  name: 'commentForm',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
      state.errors.name = false; // очищаємо помилку при зміні
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
      state.errors.email = false;
    },
    setBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
      state.errors.body = false;
    },
    setSubmitting(state, action: PayloadAction<boolean>) {
      state.isSubmitting = action.payload;
    },
    setErrors(state, action: PayloadAction<CommentFormErrors>) {
      state.errors = action.payload;
    },
    clearBody(state) {
      state.body = '';
      state.isSubmitting = false;
      state.errors = {
        name: false,
        email: false,
        body: false,
      };
    },
    resetForm(state) {
      state.name = '';
      state.email = '';
      state.body = '';
      state.isSubmitting = false;
      state.errors = { name: false, email: false, body: false };
    },
  },
});

export const {
  setName,
  setEmail,
  setBody,
  setSubmitting,
  setErrors,
  clearBody,
  resetForm,
} = commentFormSlice.actions;

export default commentFormSlice.reducer;
