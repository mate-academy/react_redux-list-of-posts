/* eslint-disable no-param-reassign */
import { User } from '../types/User';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: boolean;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: false,
};

export const loadUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => {
      state.loading = true;
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(loadUsers.rejected, state => {
      state.error = true;
      state.loading = false;
    });
  },
});

export default usersSlice.reducer;
export const {} = usersSlice.actions;
