import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type InitialStateType = User | null;

const initialState: InitialStateType = null;

export const authorSlice = createSlice({
  name: 'author',
  initialState: initialState as InitialStateType,
  reducers: {
    set(_, action: PayloadAction<User>) {
      return action.payload;
    },
  },
});

export const { set } = authorSlice.actions;

export default authorSlice.reducer;
