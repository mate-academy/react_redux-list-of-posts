import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = [] as User[];

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: { set: (_state, action: PayloadAction<User[]>) => action.payload },
});

export const { set } = slice.actions;
export default slice.reducer;
