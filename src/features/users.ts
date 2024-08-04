/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

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

export const fetchUsers = createAsyncThunk('users/fetchUsers', () => {
  return getUsers();
});

const usersSlice: Slice<UsersState> = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchUsers.rejected, state => {
      state.loading = false;
      state.hasError = true;
    });
  },
});

export default usersSlice.reducer;
