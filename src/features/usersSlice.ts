/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User[] = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (users, action) => (users = action.payload),
  },
});

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
