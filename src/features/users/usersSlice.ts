/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  usersList: User[],
  hasError: boolean,
  loading: boolean,
};

const initialState: UsersState = {
  usersList: [],
  hasError: false,
  loading: false,
};

export const fetchUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.hasError = false;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.usersList = action.payload;
    });

    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
      state.hasError = true;
    });
  },
});

export default usersSlice.reducer;
