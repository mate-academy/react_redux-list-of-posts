import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NewCommentFormState {
  values: { name: string; email: string; body: string };
  errors: { name: boolean; email: boolean; body: boolean };
  submitting: boolean;
}

const initialState: NewCommentFormState = {
  values: { name: '', email: '', body: '' },
  errors: { name: false, email: false, body: false },
  submitting: false,
};

export const newCommentFormSlice = createSlice({
  name: 'NewCommentForm',
  initialState,
  reducers: {
    setValues: (
      state,
      action: PayloadAction<{ name: string; email: string; body: string }>,
    ) => {
      return { ...state, values: action.payload };
    },
    setErrors: (
      state,
      action: PayloadAction<{ name: boolean; email: boolean; body: boolean }>,
    ) => {
      return { ...state, errors: action.payload };
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      return { ...state, submitting: action.payload };
    },
  },
});

export const { setValues, setErrors, setSubmitting } =
  newCommentFormSlice.actions;
export default newCommentFormSlice.reducer;
