/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const fetchedUsers = await getUsers();

  return fetchedUsers;
});

enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Failed = 'failed',
}

export interface UsersState {
  value: User[],
  status: Status
  error: null | string,
}

const initialState: UsersState = {
  value: [],
  status: Status.Idle,
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state: UsersState) => {
        state.status = Status.Loading;
      })
      .addCase(fetchUsers.fulfilled,
        (state: UsersState, action: PayloadAction<User[]>) => {
          state.status = Status.Idle;
          state.value = action.payload;
        })
      .addCase(fetchUsers.rejected, (state: UsersState) => {
        state.status = Status.Failed;
        state.error = 'Failed to load Users';
      });
  },
});
