import { PayloadAction, createSlice } from '@reduxjs/toolkit';

/* eslint-disable no-param-reassign */

type CommentState = {
  name: string;
  email: string;
  body: string;
  errorName: boolean;
  errorEmail: boolean;
  errorBody: boolean;
  spinner: boolean;
};

const initialState: CommentState = {
  name: '',
  email: '',
  body: '',
  errorName: false,
  errorEmail: false,
  errorBody: false,
  spinner: false,
};

export const commentSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setErName: (state, action: PayloadAction<boolean>) => {
      state.errorName = action.payload;
    },
    setErEmail: (state, action: PayloadAction<boolean>) => {
      state.errorEmail = action.payload;
    },
    setErBody: (state, action: PayloadAction<boolean>) => {
      state.errorBody = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setBody: (state, action: PayloadAction<string>) => {
      state.body = action.payload;
    },
    clear: state => {
      state.name = '';
      state.email = '';
      state.body = '';
    },
    clearError: state => {
      state.errorName = false;
      state.errorBody = false;
      state.errorEmail = false;
    },
    clearBody: state => {
      state.body = '';
    },
    spiner: (state, action: PayloadAction<boolean>) => {
      state.spinner = action.payload;
    },
  },
});

export const {
  setErName,
  setErBody,
  setErEmail,
  setName,
  setEmail,
  setBody,
  clear,
  clearError,
  clearBody,
  spiner,
} = commentSlice.actions;
export default commentSlice.reducer;
