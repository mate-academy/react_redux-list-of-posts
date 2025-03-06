import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  values: { name: '', email: '', body: '' },
  errors: { name: false, email: false, body: false },
  submitting: false,
};

export const newCommentFormSlice = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    setErrors(
      state,
      {
        payload,
      }: PayloadAction<{ name: boolean; email: boolean; body: boolean }>,
    ) {
      return {
        ...state,
        errors: payload,
      };
    },

    setValues(
      state,
      { payload }: PayloadAction<{ name: string; email: string; body: string }>,
    ) {
      return {
        ...state,
        values: payload,
      };
    },

    setSubmitting(state, { payload }: PayloadAction<boolean>) {
      return {
        ...state,
        submitting: payload,
      };
    },
  },
});
export const { setErrors, setValues, setSubmitting } =
  newCommentFormSlice.actions;
export default newCommentFormSlice.reducer;
