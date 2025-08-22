/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UsersState = {
  users: User[];
  loading: boolean;
  error: string;
  selectedUser: User | null;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
  selectedUser: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setActiveUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
  },
});
