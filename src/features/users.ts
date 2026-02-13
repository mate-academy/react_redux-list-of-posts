/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  loaded: boolean;
  users: User[];
  hasError: boolean;
};

const initialState: UsersState = {
  users: [],
  loaded: false,
  hasError: false,
};

export const loadUsers = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loaded = true;
      state.hasError = false;
    });

    builder.addCase(loadUsers.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default usersSlice.reducer;
