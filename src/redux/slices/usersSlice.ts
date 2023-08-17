/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

type UsersState = {
  users: User[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  users: [],
  loaded: false,
  hasError: false,
};

export const fetchUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loaded = true;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;
