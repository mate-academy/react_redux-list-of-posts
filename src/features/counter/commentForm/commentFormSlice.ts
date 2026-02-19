/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentData } from '../../../types/Comment';

export interface FormState extends CommentData {
  errors: { name: boolean; email: boolean; body: boolean };
  submitting: boolean;
  visible: boolean;
}

const initialState: FormState = {
  name: '',
  email: '',
  body: '',
  errors: { name: false, email: false, body: false },
  submitting: false,
  visible: false,
};

const commentFormSlice = createSlice({
  name: 'commentForm',
  initialState,
  reducers: {
    updateField(
      state,
      action: PayloadAction<{ field: keyof CommentData; value: string }>,
    ) {
      state[action.payload.field] = action.payload.value;
      state.errors[action.payload.field] = false;
    },
    setErrors(state, action: PayloadAction<Partial<FormState['errors']>>) {
      state.errors = { ...state.errors, ...action.payload };
    },
    setSubmitting(state, action: PayloadAction<boolean>) {
      state.submitting = action.payload;
    },
    clearForm(state) {
      state.name = '';
      state.email = '';
      state.body = '';
      state.errors = { name: false, email: false, body: false };
      state.submitting = false;
    },
    clearBody(state) {
      state.body = '';
      state.errors.body = false;
      state.submitting = false;
    },
    setVisible(state, action: PayloadAction<boolean>) {
      state.visible = action.payload;
    },
  },
});

export const {
  updateField,
  setErrors,
  setSubmitting,
  clearForm,
  setVisible,
  clearBody,
} = commentFormSlice.actions;
export default commentFormSlice.reducer;
