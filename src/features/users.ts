import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {
    setUsers: (_users, action: PayloadAction<User[]>) => action.payload,
    removeUser: (users, action: PayloadAction<User>) =>
      users.filter(user => user.id !== action.payload.id),
    clearUsers: () => [],
  },
});

export default usersSlice.reducer;
