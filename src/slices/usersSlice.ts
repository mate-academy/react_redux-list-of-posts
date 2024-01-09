/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { LoadingStatus } from '../types/LoadingStatus';
import { getUsers } from '../api/users';

export interface UsersState {
  users: User[];
  status: LoadingStatus;
}

const initialState: UsersState = {
  users: [],
  status: LoadingStatus.Idle,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const users = await getUsers();

    return users;
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = LoadingStatus.Loading;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = LoadingStatus.Idle;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = LoadingStatus.Failed;
      });
  },
});

export default usersSlice.reducer;
