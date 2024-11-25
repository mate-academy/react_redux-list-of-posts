/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  userList: User[];
  selectedUser: User | null;
};

const initialState: UsersState = {
  userList: [],
  selectedUser: null,
};

export const initUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(initUsers.fulfilled, (state, action) => {
      state.userList = action.payload;
    });
  },
});

export const { setSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
