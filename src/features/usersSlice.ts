import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User[] = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (_state, { payload }: PayloadAction<User[]>) => {
      return [...payload];
    },
  },
});

export const { set } = usersSlice.actions;
export default usersSlice.reducer;
