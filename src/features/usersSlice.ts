/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  users: User[];
  loading: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  users: [],
  loading: true,
  hasError: false,
};

export const initUsers = createAsyncThunk('fetch/users', () => getUsers());

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(initUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(initUsers.rejected, (state) => {
      state.loading = false;
      state.hasError = true;
    });
  },
});

export default usersSlice.reducer;
