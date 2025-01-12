import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {
    setUsers: (_, action: PayloadAction<User[]>) => {
      return action.payload;
    },
  },
});
