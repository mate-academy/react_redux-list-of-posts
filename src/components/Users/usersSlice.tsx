/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../utils/axiosClient';
import type { RootState } from '../../app/store';
import { User } from '../../types/User';
import { ErrorTypes, LoadingStatus } from '../../types/enums';

export interface UsersState {
  users: User[];
  loading: LoadingStatus;
  error: string,
}

const initialState: UsersState = {
  users: [],
  loading: LoadingStatus.Idle,
  error: '',
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return client.get<User[]>('/users');
});

export const usersSlice = createSlice(
  {
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsers.pending, (state) => {
          state.loading = LoadingStatus.Idle;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.loading = LoadingStatus.Loading;
          state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state) => {
          state.loading = LoadingStatus.Failed;
          state.error = ErrorTypes.FailedToFetch;
        });
    },
  },
);

export const getUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
