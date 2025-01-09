import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    select: (_, action: PayloadAction<User | null>) => {
      return action.payload;
    },
  },
});

export const { select } = authorSlice.actions;
export const authorReducer = authorSlice.reducer;
