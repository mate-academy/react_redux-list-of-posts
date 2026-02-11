/* eslint-disable @typescript-eslint/indent */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NewCommentFormState = {
  name: string;
  email: string;
  body: string;
  errors: {
    name: boolean;
    email: boolean;
    body: boolean;
  };
  submitting: boolean;
};

const initialState: NewCommentFormState = {
  name: '',
  email: '',
  body: '',
  errors: {
    name: false,
    email: false,
    body: false,
  },
  submitting: false,
};

export const NewCommentFormSlice = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    setValues(
      state,
      action: PayloadAction<
        Partial<Omit<NewCommentFormState, 'errors' | 'submitting'>>
      >,
    ) {
      Object.assign(state, action.payload);
    },
    setErrors(state, action: PayloadAction<NewCommentFormState['errors']>) {
      return {
        ...state,
        errors: action.payload,
      };
    },
    clearForm: () => initialState,
    setSubmitting(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        submitting: action.payload,
      };
    },
  },
});

export const { setValues, setErrors, clearForm, setSubmitting } =
  NewCommentFormSlice.actions;
export default NewCommentFormSlice.reducer;
