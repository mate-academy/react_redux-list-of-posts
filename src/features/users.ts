/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const usersFromServer = await getUsers();

    return usersFromServer;
  },
);

export interface Status {
  status: 'idle' | 'loading' | 'failed';
}

export interface UsersState {
  value: User[],
  status: string,
  error: string | null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state: UsersState) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (
        state: UsersState,
        action: PayloadAction<User[]>,
      ) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(fetchUsers.rejected, (state: UsersState) => {
        state.status = 'failed';
        state.error = 'Failed to load Users';
      });
  },
});

export default usersSlice.reducer;
