/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Errors = {
  name: boolean,
  email: boolean,
  body: boolean,
};

type NewCommentFormState = {
  errors: Errors;
  name: string,
  email: string,
  body: string,
};

const initialState: NewCommentFormState = {
  errors: {
    name: false,
    email: false,
    body: false,
  },
  name: '',
  email: '',
  body: '',
};

const newCommentFormSlice = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.errors.name = false;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.errors.email = false;
    },
    setBody: (state, action: PayloadAction<string>) => {
      state.body = action.payload;
      state.errors.body = false;
    },
    setErrors: (state) => {
      state.errors.name = !state.name;
      state.errors.email = !state.email;
      state.errors.body = !state.body;
    },
    clearBody: (state) => {
      state.body = '';
    },
    clearForm: (state) => {
      state.name = '';
      state.email = '';
      state.body = '';
      state.errors = {
        name: false,
        email: false,
        body: false,
      };
    },
  },
});

export default newCommentFormSlice.reducer;
export const {
  setName,
  setEmail,
  setBody,
  setErrors,
  clearBody,
  clearForm,
} = newCommentFormSlice.actions;
