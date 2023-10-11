/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  users: User[];
  status: Status;
}

const initialState: UsersState = {
  users: [],
  status: Status.Inaction,
};

export const getUsersAsync = createAsyncThunk(
  'users/fetchUsers',
  async () => getUsers(),
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = Status.Inaction;
        state.users = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state) => {
        state.status = Status.Failed;
      });
  },
});

export default usersSlice.reducer;
