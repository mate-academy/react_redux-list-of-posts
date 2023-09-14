/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UserState = {
  users: User[],
  loaded: boolean,
  hasError: boolean,
};

const initialUsers: UserState = {
  users: [],
  loaded: false,
  hasError: false,
};

export const initUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsers,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initUsers.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(initUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loaded = true;
    });

    builder.addCase(initUsers.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default usersSlice.reducer;
