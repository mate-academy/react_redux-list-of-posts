/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { RootState } from '../app/store';
import { Status } from '../types/Status';
import { User } from '../types/User';

export interface UsersState {
  users: User[];
  status: Status;
}

const initialState: UsersState = {
  users: [],
  status: Status.idle,
};

export const loadUsers = createAsyncThunk(
  'users/SET',
  (async () => {
    return await getUsers();
  }),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.status = Status.idle;
        state.users = action.payload;
      })
      .addCase(loadUsers.rejected, (state) => {
        state.status = Status.failed;
      });
  },
});

export const selectAllUsers = (state: RootState) => state.users.users;
export default usersSlice.reducer;
