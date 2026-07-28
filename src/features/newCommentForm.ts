/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';

export interface NewCommentFormState {
  name: string;
  email: string;
  body: string;
  errors: {
    name: boolean;
    email: boolean;
    body: boolean;
  };
}

const initialState: NewCommentFormState = {
  name: '',
  email: '',
  body: '',
  errors: {
    name: false,
    email: false,
    body: false,
  },
};

export const newCommentFormSlice = createSlice({
  name: 'newComment',
  initialState,
  reducers: {
    handleChange: (
      state,
      action: PayloadAction<{
        field: keyof Omit<NewCommentFormState, 'errors'>;
        value: string;
      }>,
    ) => {
      const { field, value } = action.payload;

      state.errors[field] = false;
      state[field] = value;
    },
    setErrors: (
      state,
      action: PayloadAction<NewCommentFormState['errors']>,
    ) => {
      state.errors = action.payload;
    },
    clearBody: state => {
      state.body = '';
    },
    clearForm: state => {
      state.name = '';
      state.email = '';
      state.body = '';
    },
  },
});

export const { handleChange, setErrors, clearBody, clearForm } =
  newCommentFormSlice.actions;

export const selectNewCommentForm = (state: RootState) => state.newComment;

export default newCommentFormSlice.reducer;
