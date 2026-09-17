import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (_, action: PayloadAction<User>) => action.payload,
  },
});

export const { set } = authorSlice.actions;
