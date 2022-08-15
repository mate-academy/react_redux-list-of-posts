import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

type ValuesType = {
  name: string;
  email: string;
  body: string;
};

export interface NewCommentFormState {
  values: ValuesType;
  remember: boolean;
}

const initialState: NewCommentFormState = {
  values: {
    name: '',
    email: '',
    body: '',
  },
  remember: false,
};

export const newCommentFormSlice = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    setIsRemember: (state, action: PayloadAction<boolean>) => {
      state.remember = action.payload;
    },
    setValues: (state, action: PayloadAction<ValuesType>) => {
      state.values = action.payload;
    },
  },
});

export const {
  setIsRemember,
  setValues,
} = newCommentFormSlice.actions;

export const newCommentForm = (state: RootState) => (
  state.newCommentForm
);

export default newCommentFormSlice.reducer;
