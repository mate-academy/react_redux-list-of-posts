/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUsers } from '../api/users';

import { User } from '../types/User';

type UsersState = {
  items: User[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  items: [],
  loaded: true,
  hasError: false,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const users = await getUsers();

    return users;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state: UsersState) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchUsers.fulfilled, (
        state: UsersState,
        action: PayloadAction<User[]>,
      ) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state: UsersState) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;
