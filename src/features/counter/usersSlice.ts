/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import * as usersApi from '../../api/users';

export interface UsersState {
  users: User[];
  loading: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  hasError: false,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const data = await usersApi.getUsers();

  return data;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, state => {
        state.hasError = true;
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
