/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import { StatusType } from '../types/Status';

export interface UsersState {
  users: User[];
  status: StatusType;
  hasError: boolean;
}

const initialState: UsersState = {
  users: [],
  status: StatusType.idle,
  hasError: false,
};

export const loadUsers = createAsyncThunk(
  'users/SET',
  async () => {
    const loadedusers = await getUsers();

    return loadedusers;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.status = StatusType.loading;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.status = StatusType.idle;
        state.users = action.payload;
      })
      .addCase(loadUsers.rejected, (state) => {
        state.status = StatusType.failed;
        state.hasError = false;
      });
  },
});

export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
