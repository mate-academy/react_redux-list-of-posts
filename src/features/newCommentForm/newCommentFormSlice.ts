/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface NewCommentForm {
  form: boolean;
}

const initialState: NewCommentForm = {
  form: false,
};

export const newCommentFormSlice = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    showCommentForm: (state) => {
      state.form = true;
    },
    hideCommentForm: (state) => {
      state.form = false;
    },
  },
});

export const { showCommentForm, hideCommentForm } = newCommentFormSlice.actions;
export default newCommentFormSlice.reducer;
