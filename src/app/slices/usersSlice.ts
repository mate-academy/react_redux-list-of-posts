/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const fetchedUsers = await getUsers();

  return fetchedUsers;
});

export interface UsersState {
  value: User[],
  status: 'idle' | 'loading' | 'failed',
  error: null | string,
}

const initialState: UsersState = {
  value: [],
  status: 'idle',
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state: UsersState) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled,
        (state: UsersState, action: PayloadAction<User[]>) => {
          state.status = 'idle';
          state.value = action.payload;
        })
      .addCase(fetchUsers.rejected, (state: UsersState) => {
        state.status = 'failed';
        state.error = 'Failed to load Users';
      });
  },
});
