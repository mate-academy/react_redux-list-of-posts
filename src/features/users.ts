import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {
    setUsers: (users, action: PayloadAction<User[]>) => {
      users.push(...action.payload);
    },
  },
});

export default usersSlice.reducer;
