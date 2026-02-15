/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../types/User';
import { getUsers } from '../api/users';

export const loadUsers = createAsyncThunk('fetch/users', () => getUsers());

export const { reducer, actions } = createSlice({
  name: 'users',
  initialState: {
    selectedUser: null as User | null,
    users: [] as User[],
  },
  reducers: {
    setSelectedUser: (state, { payload }: PayloadAction<User | null>) => {
      state.selectedUser = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      loadUsers.fulfilled,
      (state, { payload }: PayloadAction<User[]>) => {
        state.users = payload;
      },
    );
  },
});
