/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface NewCommentFormState {
  values: {
    name: string
    email: string
    body: string
  },
  errors: {
    name: boolean
    email: boolean
    body: boolean
  },
}

const initialState: NewCommentFormState = {
  values: {
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

export const newCommentFormSlice = createSlice({
  name: 'commentForm',
  initialState,
  reducers: {
    setValues: (
      state: NewCommentFormState,
      action: PayloadAction<NewCommentFormState['values']>,
    ) => {
      state.values = action.payload;
    },
    setErrors: (
      state: NewCommentFormState,
      action: PayloadAction<NewCommentFormState['errors']>,
    ) => {
      state.errors = action.payload;
    },
    clearForm: () => initialState,
  },
});

export const { setValues, setErrors, clearForm } = newCommentFormSlice.actions;

export default newCommentFormSlice.reducer;
