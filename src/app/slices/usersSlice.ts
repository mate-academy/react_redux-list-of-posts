/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const usersFromServer = await getUsers();

    return usersFromServer;
  },
);

enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Failed = 'failed',
}

export interface UsersState {
  value: User[],
  status: Status,
  error: string | null,
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
      .addCase(fetchUsers.fulfilled, (
        state: UsersState, action: PayloadAction<User[]>,
      ) => {
        state.status = Status.Idle;
        state.value = action.payload;
      })
      .addCase(fetchUsers.rejected, (state: UsersState) => {
        state.status = Status.Failed;
        state.error = 'Failed to load Users';
      });
  },
});
