import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(users, { payload }: PayloadAction<User[]>) {
      users.users = payload;
    },
  },
});

export default usersSlice.reducer;
