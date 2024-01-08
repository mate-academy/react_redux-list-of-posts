/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type NewCommentState = {
  newComment: {
    name: string,
    email: string,
    body: string,
  },
  errors: {
    name: boolean,
    email: boolean,
    body: boolean,
  },
};

const initialState: NewCommentState = {
  newComment: {
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

type PayloadCommentKey = 'name' | 'email' | 'body';

type PayloadCommentValues = {
  key: string;
  value: string;
};

type PayloadCommentErrors = {
  key: string;
  value: boolean;
};

export const newCommentSlice = createSlice({
  name: 'newComment',
  initialState,
  reducers: {
    setValues: (state, action: PayloadAction<PayloadCommentValues>) => {
      state.newComment[action.payload.key as PayloadCommentKey] = action
        .payload.value;
    },
    setErrors: (state, action: PayloadAction<PayloadCommentErrors>) => {
      state.errors[action.payload.key as PayloadCommentKey] = action
        .payload.value;
    },
    clearForm: (state) => {
      state.newComment = initialState.newComment;
      state.errors = initialState.errors;
    },
  },
});

export default newCommentSlice.reducer;
export const { setValues, setErrors, clearForm } = newCommentSlice.actions;
