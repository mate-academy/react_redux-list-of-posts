/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  users: User[];
  selectedUser: User | null;
};

const initialState: UsersState = {
  users: [],
  selectedUser: null,
};

// Асинхронний thunk для завантаження користувачів
export const initUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(initUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { setSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
