import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from '../types/User';

const initialState: User[] = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (users, action: PayloadAction<User[]>) => {
      users.push(...action.payload);
    },
  },
});

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
