/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentDataErrors, CommentFieldData } from '../types/Comment';
import { selectPost } from './selectedPost';
import { RootState } from '../app/store';

const initialState = {
  comment: {
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

export const newCommentFormSlice = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    setValue: (state, { payload }: PayloadAction<CommentFieldData>) => {
      state.comment[payload.field] = payload.value;
      if (payload.field) {
        state.errors[payload.field] = false;
      }
    },
    setAllErrors: (state, { payload }: PayloadAction<CommentDataErrors>) => {
      state.errors = payload;
    },
    clearAllData: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(selectPost.type, () => initialState);
  },
});

export const { setValue, setAllErrors, clearAllData } =
  newCommentFormSlice.actions;

export const selectFormData = (state: RootState) =>
  state.newCommentForm.comment;

export const selectFormErrors = (state: RootState) =>
  state.newCommentForm.errors;
