import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const usersFromServer = await getUsers();

  return usersFromServer;
});

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Failed = 'failed',
}

type UsersState = {
  users: User[],
  status: Status,
  error: string | null,
};

const initialState: UsersState = {
  users: [],
  status: Status.Idle,
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchUsers.fulfilled, (
        state: UsersState,
        action: PayloadAction<User[]>,
      ) => {
        state.status = Status.Idle;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state: UsersState) => {
        state.status = Status.Failed;
        state.error = 'Something went wrong';
      });
  },
});
