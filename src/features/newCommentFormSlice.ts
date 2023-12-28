/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface NewCommentForm {
  values: {
    name: string;
    email: string;
    body: string;
  },
  errors: {
    name: boolean;
    email: boolean;
    body: boolean;
  },
  isValid: boolean,
}

const initialState: NewCommentForm = {
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
  isValid: true,
};

export type FormField = keyof NewCommentForm['values'];

export const newCommentForm = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    updateValue: (state, action: PayloadAction<{ name: FormField; value: string }>) => {
      const { name, value } = action.payload;

      if (name in state.values) {
        state.values[name] = value;
        state.errors[name] = false;
      }
    },
    resetForm: (state) => {
      state.values.name = '';
      state.values.email = '';
      state.values.body = '';
    },
    resetFormPartly: (state) => {
      state.values.body = '';
    },
    validateFields: (state) => {
      state.errors.name = state.values.name.length === 0;
      state.errors.body = state.values.body.length === 0;
      state.errors.email = state.values.email.length === 0;
      state.isValid = !Object.values(state.errors).some((error) => error);
    },
  },
});

export default newCommentForm.reducer;
export const {
  updateValue,
  validateFields,
  resetFormPartly,
  resetForm,
} = newCommentForm.actions;
