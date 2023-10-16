import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  submitting: false,
  newCommentFormErrors: {
    name: false,
    body: false,
    email: false,
  },
  name: '' as string,
  email: '' as string,
  body: '' as string,
};

export const NewCommentFormSlice = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    setValues: (state, action) => {
      return { ...state, ...action.payload };
    },
    setSubmitting: (state, action) => {
      return { ...state, submitting: action.payload };
    },
    setNewCommentFormErrors: (state, action) => {
      return { ...state, newCommentFormErrors: action.payload };
    },
    clearForm: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  setValues, setSubmitting, setNewCommentFormErrors, clearForm,
} = NewCommentFormSlice.actions;
export default NewCommentFormSlice.reducer;
