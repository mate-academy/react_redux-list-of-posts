/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {
    setUsers(_state, action: PayloadAction<User[]>) {
      return action.payload;
    },
  },
});

export default usersSlice.reducer;
