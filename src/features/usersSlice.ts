/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User[] = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (users, action: PayloadAction<User[]>) => {
      return action.payload.length ? action.payload : users;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
