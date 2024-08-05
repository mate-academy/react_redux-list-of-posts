/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  error: string;
  isLoading: boolean;
  users: User[];
};

const initialState: UsersState = {
  error: '',
  isLoading: false,
  users: [],
};

export const initUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initUsers.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(initUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });

    builder.addCase(initUsers.rejected, state => {
      state.error = 'Error';
    });
  },
});

export default usersSlice.reducer;
