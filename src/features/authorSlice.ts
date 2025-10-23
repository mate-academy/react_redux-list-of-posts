// src/slices/authorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User | null = null;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_state, action: PayloadAction<User | null>) => action.payload,
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
