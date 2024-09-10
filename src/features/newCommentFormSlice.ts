/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentDataErrors, CommentFieldData } from '../types/Comment';
import { selectPost } from './selectedPostSlice';

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

const newCommentFormSlice = createSlice({
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

export default newCommentFormSlice.reducer;
export const { setValue, setAllErrors, clearAllData } =
  newCommentFormSlice.actions;
