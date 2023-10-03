/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersSliceState = {
  users: User[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersSliceState = {
  users: [],
  loaded: false,
  hasError: false,
};

export const fetchUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, state => {
      state.loaded = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loaded = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, state => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});
