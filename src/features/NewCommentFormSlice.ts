import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FieldName = 'name' | 'email' | 'body';

type NewCommentFormState = {
  name: string;
  email: string;
  body: string;
  errors: Record<FieldName, boolean>;
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
    setValues: (
      state,
      action: PayloadAction<{ field: FieldName; value: string }>,
    ) => {
      state[action.payload.field] = action.payload.value;
      state.errors[action.payload.field] = false;
    },
    setError: (
      state,
      action: PayloadAction<{ field: FieldName; hasError: boolean }>,
    ) => {
      state.errors[action.payload.field] = action.payload.hasError;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.submitting = action.payload;
    },
    clear: () => initialState,
  },
});

export default NewCommentFormSlice.reducer;
export const { actions } = NewCommentFormSlice;
