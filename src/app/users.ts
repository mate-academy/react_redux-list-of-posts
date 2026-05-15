/* eslint-disable no-param-reassign */
import { getUsers } from '../api/users';
import { User } from '../types/User';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [] as User[],
};

export const loadUsers = createAsyncThunk('users/fetch', async () =>
  getUsers(),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadUsers.pending, () => {});

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});
