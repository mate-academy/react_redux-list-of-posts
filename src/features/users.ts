/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as usersApi from '../api/users';
import { User } from '../types/User';

type UsersState = {
  users: User[];
  usersLoading: boolean;
  usersError: string;
};

const initialState: UsersState = {
  users: [],
  usersLoading: false,
  usersError: '',
};

export const init = createAsyncThunk('users/fetch', usersApi.getUsers);

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.usersLoading = true;
    });
    builder.addCase(init.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.usersLoading = false;
    });
    builder.addCase(init.rejected, (state) => {
      state.usersLoading = false;
      state.usersError = 'Can`t load users from server!';
    });
  },
});

export default users.reducer;
