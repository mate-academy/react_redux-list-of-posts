/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NewFormCommentState {
  name: string;
  email: string;
  body: string;
}

const initialState = {
  name: '',
  email: '',
  body: '',
};

export const newFormCommentStateSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addingName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    addingEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    addingBody: (state, action: PayloadAction<string>) => {
      state.body = action.payload;
    },
    clearForm: (state) => {
      state.body = '';
      state.email = '';
      state.name = '';
    },
  },
});

export default newFormCommentStateSlice.reducer;
export const { actions } = newFormCommentStateSlice;
