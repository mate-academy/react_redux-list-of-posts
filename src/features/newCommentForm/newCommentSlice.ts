import { createSlice } from '@reduxjs/toolkit';

export interface NewCommentFormState {
  form: boolean;
}

const initialState: NewCommentFormState = {
  form: false,
};

export const newCommentForm = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    showCommentForm: state => {
      state.form = true;
    },
    hideCommentForm: state => {
      state.form = false;
    },
  },
});

export const { showCommentForm, hideCommentForm } = newCommentForm.actions;
export default newCommentForm.reducer;
