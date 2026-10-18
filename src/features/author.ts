import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<User | null>) => action.payload,
  },
});

export const { set: setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
