/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () =>
  getUsers(),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, (state: UsersState) => {
        state.status = 'loading';
      })
      .addCase(
        fetchUsers.fulfilled,
        (state: UsersState, action: PayloadAction<User[]>) => {
          state.status = 'idle';
          state.users = action.payload;
        },
      )
      .addCase(fetchUsers.rejected, (state: UsersState) => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;
