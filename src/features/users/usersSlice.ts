import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export const UsersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      return action.payload;
    },
  },
});

export const { setUsers } = UsersSlice.actions;
