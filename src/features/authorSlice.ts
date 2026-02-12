import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export type AuthorState = User | null;

export const initialState: AuthorState = null;

export const authorSlice = createSlice({
  name: 'author',
  initialState: initialState as AuthorState,
  reducers: {
    setAuthor: (_, action: PayloadAction<AuthorState>) => action.payload,
  },
});

export const actions = authorSlice.actions;
export default authorSlice.reducer;
