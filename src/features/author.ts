import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    getAuthor: (_, action: PayloadAction<User | null>) => action.payload,
  },
});

export const authorActions = authorSlice.actions;
export const authorReducer = authorSlice.reducer;
