/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = [] as User[];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (_, action: PayloadAction<User[]>) => action.payload,
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
