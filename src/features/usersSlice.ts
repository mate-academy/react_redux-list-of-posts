/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const getUsersFromServer = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

type UsersState = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUsersFromServer.pending, state => {
      state.loading = true;
    });

    builder.addCase(getUsersFromServer.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(getUsersFromServer.rejected, state => {
      state.loading = false;
      state.error = "Can't download users from server";
    });
  },
});
