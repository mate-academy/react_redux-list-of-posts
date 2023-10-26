/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  users: User[];
  statusUsers: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [],
  statusUsers: 'loading',
};

export const loadUsers = createAsyncThunk(
  'users/fetch', getUsers,
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(loadUsers.pending, (state) => {
      state.statusUsers = 'loading';
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.statusUsers = 'idle';
      state.users = action.payload;
    });

    builder.addCase(loadUsers.rejected, (state) => {
      state.users = [];
      state.statusUsers = 'failed';
    });
  },
});

export default usersSlice.reducer;
