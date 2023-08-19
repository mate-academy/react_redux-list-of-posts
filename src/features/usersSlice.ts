/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import { Status } from '../types/Status';

export interface UsersState {
  users: User[];
  status: Status;
}

const initialState: UsersState = {
  users: [],
  status: Status.Idle,
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
      .addCase(fetchUsers.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = Status.Idle;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = Status.Failed;
      });
  },
});
