/* eslint-disable no-param-reassign */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = User | null;

const authorSlice = createSlice({
  name: 'autor',
  initialState: null as AuthorState,
  reducers: {
    setAuthor: (_, action: PayloadAction<User>) => action.payload,
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
