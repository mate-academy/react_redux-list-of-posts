/* eslint-disable no-param-reassign */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export type Author = User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState: null as Author,
  reducers: {
    set: (_state, action: PayloadAction<Author>) => {
      return action.payload;
    },
  },
});

export const { set } = authorSlice.actions;
export default authorSlice.reducer;
