import { createSlice } from '@reduxjs/toolkit';

interface NewFormState {
  name: string;
  email: string;
  body: string;
}

const initialState: NewFormState = {
  name: '',
  email: '',
  body: '',
};

export const newFormSlice = createSlice({
  name: 'newForm',
  initialState,
  reducers: {
    setName: (state, action) => {
      return {
        ...state,
        name: action.payload,
      };
    },
    setEmail: (state, action) => {
      return {
        ...state,
        email: action.payload,
      };
    },
    setBody: (state, action) => {
      return {
        ...state,
        body: action.payload,
      };
    },
    clearTwoFiledForm: state => {
      return {
        ...state,
        body: '',
      };
    },
    clearAll: () => {
      return {
        name: '',
        email: '',
        body: '',
      };
    },
  },
});

export const newFormReducer = newFormSlice.reducer;
export type { NewFormState };
