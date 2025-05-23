/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Draft } from 'immer';
import { User } from '../types/User';
import * as usersApi from '../api/users';

type UsersState = {
  users: User[];
  loading: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  hasError: false,
};

export const fetchUsers = createAsyncThunk('users/fetch', usersApi.getUsers);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, (state: Draft<UsersState>) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state: Draft<UsersState>, action) => {
        state.users = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(fetchUsers.rejected, (state: Draft<UsersState>) => {
      state.hasError = true;
      state.loading = false;
    });
  },
});

export default usersSlice.reducer;
