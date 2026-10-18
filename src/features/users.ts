import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User[] = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<User[]>) => action.payload,
  },
});

export const { set: setUsers } = usersSlice.actions;

export default usersSlice.reducer;
