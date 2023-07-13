/* eslint-disable no-console */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Values {
  name: string,
  email: string,
  body: string,
}

interface Errors {
  name: boolean,
  email: boolean,
  body: boolean,
}

export interface FormState {
  values: Values,
  errors: Errors,
}

const initialState: FormState = {
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

export const commentsFormSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setValues: (
      state: FormState,
      action: PayloadAction<Values>,
    ) => ({
      ...state,
      values: action.payload,
    }),

    setErrors: (
      state: FormState,
      action: PayloadAction<Errors>,
    ) => ({
      ...state,
      errors: action.payload,
    }),
  },
});

export const { setValues, setErrors } = commentsFormSlice.actions;
