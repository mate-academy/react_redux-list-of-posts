/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = {
  users: [] as User[],
  errors: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (users, action: PayloadAction<User[]>) => {
      users.users = action.payload;
    },
    setErrors: (users, action: PayloadAction<string>) => {
      users.errors = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
