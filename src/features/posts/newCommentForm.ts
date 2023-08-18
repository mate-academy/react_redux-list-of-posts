/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NewCommentState = {
  name: {
    value: string,
    hasError: boolean,
  };
  email: {
    value: string,
    hasError: boolean,
  }
  body: {
    value: string,
    hasError: boolean,
  }
};

const initialState: NewCommentState = {
  name: {
    value: '',
    hasError: false,
  },
  email: {
    value: '',
    hasError: false,
  },
  body: {
    value: '',
    hasError: false,
  },
};

const NewCommentSlice = createSlice({
  name: 'newComment',
  initialState,
  reducers: {
    setNameValue: (state, action: PayloadAction<string>) => {
      state.name.value = action.payload;
    },
    setEmailValue: (state, action: PayloadAction<string>) => {
      state.email.value = action.payload;
    },
    setBodyValue: (state, action: PayloadAction<string>) => {
      state.body.value = action.payload;
    },
    setNameError: (state, action: PayloadAction<boolean>) => {
      state.name.hasError = action.payload;
    },
    setEmailError: (state, action: PayloadAction<boolean>) => {
      state.email.hasError = action.payload;
    },
    setBodyError: (state, action: PayloadAction<boolean>) => {
      state.body.hasError = action.payload;
    },
    resetAllValues: (state) => {
      state.name.value = '';
      state.email.value = '';
      state.body.value = '';
    },
    resetAllErrors: (state) => {
      state.name.hasError = false;
      state.email.hasError = false;
      state.body.hasError = false;
    },
  },
});

export const {
  setNameValue,
  setBodyValue,
  setEmailValue,
  setNameError,
  setBodyError,
  setEmailError,
  resetAllErrors,
  resetAllValues,
} = NewCommentSlice.actions;

export default NewCommentSlice.reducer;
