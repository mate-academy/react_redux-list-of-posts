/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

export interface FormState {
  nameError: boolean;
  emailError: boolean;
  bodyError: boolean;
  name: string;
  email: string;
  body: string;
}

const initialState: FormState = {
  nameError: false,
  emailError: false,
  bodyError: false,
  name: '',
  email: '',
  body: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setField: (
      state,
      action: { payload: { field: 'name' | 'email' | 'body'; value: string } },
    ) => {
      const { field, value } = action.payload;

      state[field] = value;

      state[field] = value;
      state[`${field}Error`] = false;
    },
    validateField: state => {
      state.emailError = !state.email;
      state.bodyError = !state.body;
      state.nameError = !state.name;
    },
    clear: () => initialState,
  },
});

export default formSlice.reducer;
export const { clear, setField, validateField } = formSlice.actions;
