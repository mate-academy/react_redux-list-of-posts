import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
/* eslint-disable no-param-reassign */

const initialState = null as User | null;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    select: (_, action: PayloadAction<User>) => action.payload,

    clearUser: () => null,
  },
});

export default authorSlice.reducer;

export const { clearUser, select } = authorSlice.actions;
