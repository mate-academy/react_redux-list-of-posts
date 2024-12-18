/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
};

export const importUsersAsync = createAsyncThunk('users/fetch', async () => {
  const users = await getUsers();

  return users;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(importUsersAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(importUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(importUsersAsync.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;
